import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Nav } from '../Nav';
import { Starfield } from '../Starfield';
import { CastleStage } from '../CastleStage';
import { Book } from '../Book';
import LevelPicker from '../LevelPicker/LevelPicker';
import mobileScene from '../../assets/artwork/mobile.jpg';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { quizStart, setLevel } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';
import { COPY, LEVELS, WIDE_VIEWPORT } from './ChooseLevel.constants';
import { COPY as QUIZ_COPY } from '../Quiz/Quiz.constants';

// Where the camera comes to rest. First entry is the wide establishing
// view; the rest line up with LEVELS. Origins are percentages of the
// illustration, so they stay correct at any viewport size.
// Zoom is kept deliberately shallow. A promoted layer is rasterised at its
// displayed size, so raster memory grows with the SQUARE of the zoom — at
// 2.7x, ten full-screen layers cost around 320MB of live raster and the
// browser starts evicting them mid-scroll, which shows up as flicker.
// Most of the sense of travel comes from moving the origin, not the scale.
// The camera path: a wide establishing view, then one stop per level. Built
// from LEVELS so the resting point and the guide line always agree.
const TARGETS = [
  { zoom: 1.0, ox: 50, oy: 50 },
  ...LEVELS.map((l) => ({ zoom: l.zoom, ox: l.anchor.x, oy: l.anchor.y })),
];

// Region bounds in the same order as the camera's level stops.
const REGIONS = LEVELS.map((l) => l.region);

const lerp = (a, b, t) => a + (b - a) * t;

const ChooseLevel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const pinRef = useRef(null);
  const camera = useRef({ zoom: 1, ox: 50, oy: 50, active: -1 });

  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const wide = useMediaQuery(WIDE_VIEWPORT);

  // ?pick reads a point off the portrait artwork as a percentage, which is
  // what mobileAnchor wants. Clicking beats guessing from a screenshot.
  const picking =
    typeof window !== 'undefined' && window.location.search.includes('pick');
  const [pick, setPick] = useState('tap the scene to read its anchor');

  const onPickHero = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const text = `mobileAnchor: { x: ${x.toFixed(0)}, y: ${y.toFixed(0)} }`;
    setPick(text);
    console.log(text);
  };

  // Begin glides to the first landmark rather than starting a quiz — the
  // levels are the next thing to choose from, not a screen away.
  const onBeginHandler = () => {
    const track = scrollRef.current;
    if (!track) return;
    const distance = track.offsetHeight - window.innerHeight;
    const firstStop = distance / (TARGETS.length - 1);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: firstStop, behavior: reduce ? 'auto' : 'smooth' });
  };

  const onSelectLevel = (level) => () => {
    dispatch(setLevel(level));
    dispatch(quizStart());
    navigate(ROUTES.questions);
  };

  useEffect(() => {
    if (reduced) return undefined;
    const track = scrollRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return undefined;

    let frame = 0;
    const stops = TARGETS.length - 1;

    const update = () => {
      const distance = track.offsetHeight - window.innerHeight;
      const travelled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), distance);
      const progress = distance > 0 ? travelled / distance : 0;

      // Position along the chain of stops, e.g. 1.5 is halfway from the
      // first landmark to the second.
      const segment = progress * stops;
      const active =
        segment < 0.6 ? -1 : Math.min(Math.max(Math.round(segment) - 1, 0), LEVELS.length - 1);

      if (wide) {
        const i = Math.min(Math.floor(segment), stops - 1);
        const t = segment - i;
        const from = TARGETS[i];
        const to = TARGETS[i + 1];
        camera.current = {
          zoom: lerp(from.zoom, to.zoom, t),
          ox: lerp(from.ox, to.ox, t),
          oy: lerp(from.oy, to.oy, t),
          active,
        };
      } else {
        // Portrait keeps the whole castle in frame and lets only the light
        // travel, because there is no room to zoom into it without cropping
        // most of the drawing away.
        const rest = active < 0 ? { x: 50, y: 50 } : LEVELS[active].anchor;
        camera.current = { zoom: 1, ox: rest.x, oy: rest.y, active };
      }

      // Still on the DOM, because the chapter copy is styled off it.
      if (pin.dataset.active !== String(active)) pin.dataset.active = String(active);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced, wide]);

  if (reduced) return <LevelPicker />;

  const intro = (
    <div className="castle-intro">
      <span className="eyebrow">{QUIZ_COPY.school}</span>
      <h1 className="hero-title">{QUIZ_COPY.heroTitle}</h1>
      <p className="intro-description">{QUIZ_COPY.description}</p>
      <button onClick={onBeginHandler} className="default-btn">
        {QUIZ_COPY.start}
      </button>
      <span className="castle-cue">{COPY.cue}</span>
    </div>
  );

  // Portrait: the whole castle held in a band at the top, and the levels
  // arriving one at a time underneath it, each threaded back up to the wing
  // it belongs to. Same scroll positions as the camera stops, so the two
  // layouts tell the same story.
  if (!wide) {
    return (
      <div className="app app-landing">
        <Starfield />
        <Nav />

        <section className="castle-scroll castle-scroll-portrait" ref={scrollRef}>
          <div className="castle-pin castle-pin-portrait" ref={pinRef} data-active="-1">
            <div className="hero-art">
              {/* The frame carries the artwork's own aspect ratio, so an
                  anchor is a plain percentage of it. Resolving against 100vw
                  instead would drift by the width of a scrollbar. */}
              <div
                className="hero-frame"
                onClick={picking ? onPickHero : undefined}
              >
                <img src={mobileScene} className="hero-image" alt="" />

                {/* The lit windows are painted into the artwork, so arriving
                    somewhere is shown by warming the area around it rather
                    than by switching a window layer on. */}
                {LEVELS.map(({ id, mobileAnchor }, i) => (
                  <span
                    key={id}
                    className="hero-glow"
                    data-i={i}
                    style={{ left: `${mobileAnchor.x}%`, top: `${mobileAnchor.y}%` }}
                  />
                ))}

                {LEVELS.map(({ id, mobileAnchor }, i) => (
                  <span
                    key={id}
                    className="hero-thread"
                    data-i={i}
                    style={{ left: `${mobileAnchor.x}%`, top: `${mobileAnchor.y}%` }}
                  />
                ))}
              </div>

              <div className="castle-veil" />
            </div>

            {intro}

            <div className="castle-stack">
              {LEVELS.map(({ id, name, place, blurb, spine }, i) => (
                <article className="sheet-card" data-i={i} key={id}>
                  <Book spine={spine} />
                  <span className="eyebrow">
                    {COPY.chapterEyebrow} {i + 1} — {name}
                  </span>
                  <h2 className="guide-title">{place}</h2>
                  <p className="guide-blurb">{blurb}</p>
                  <button onClick={onSelectLevel(id)} className="default-btn">
                    {COPY.begin}
                  </button>
                </article>
              ))}
            </div>

            {picking && <output className="castle-picker">{pick}</output>}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="app app-landing">
      <Starfield />
      <Nav />

      <section className="castle-scroll" ref={scrollRef}>
        <div className="castle-pin" ref={pinRef} data-active="-1">
          <CastleStage camera={camera} regions={REGIONS} />
          <div className="castle-veil" />

          {intro}

          {LEVELS.map(({ id, name, place, blurb, anchor, side, labelDrop }, i) => (
            <div
              className="guide"
              data-i={i}
              data-side={side}
              key={id}
              style={{
                left: `${anchor.x}%`,
                top: `${anchor.y}%`,
                '--label-drop': `${labelDrop}svh`,
              }}
            >
              <span className="guide-node" />
              <div className="guide-arm">
                <span className="guide-line" />
                <div className="guide-text">
                  <span className="eyebrow">
                    {COPY.chapterEyebrow} {i + 1} — {name}
                  </span>
                  <h2 className="guide-title">{place}</h2>
                  <p className="guide-blurb">{blurb}</p>
                  <button onClick={onSelectLevel(id)} className="default-btn">
                    {COPY.begin}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChooseLevel;

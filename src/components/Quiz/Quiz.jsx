import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { COPY } from './Quiz.constants';
import { Nav } from '../Nav';
import { Hero } from '../Hero';
import { Starfield } from '../Starfield';
import { quizStart } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chaptersRef = useRef(null);

  const onStartHandler = () => {
    dispatch(quizStart());
    navigate(ROUTES.questions);
  };

  useEffect(() => {
    const root = chaptersRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        );
      },
      { threshold: 0.45 }
    );

    root.querySelectorAll('.stage-chapter').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Starfield />
      <Nav />

      <section className="stage">
        <div className="stage-film">
          <Hero />
        </div>

        <div className="stage-chapters" ref={chaptersRef}>
          <div className="stage-chapter">
            <span className="eyebrow">{COPY.school}</span>
            <h1 className="hero-title">{COPY.heroTitle}</h1>
            <span className="scroll-cue">
              {COPY.scrollCue}
              <svg width="14" height="22" viewBox="0 0 16 26" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                <path d="M8 0 V18" />
                <path d="M2 13 L8 19 L14 13" />
              </svg>
            </span>
          </div>

          <div className="stage-chapter">
            <span className="eyebrow">{COPY.eyebrow}</span>
            <h2 className="intro-title">{COPY.title}</h2>
            <p className="intro-description">{COPY.description}</p>
          </div>

          <div className="stage-chapter">
            <button onClick={onStartHandler} className="default-btn">
              {COPY.start}
            </button>
            <p className="intro-note">{COPY.note}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;

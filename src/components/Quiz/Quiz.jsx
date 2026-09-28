import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { COPY } from './Quiz.constants';
import { Nav } from '../Nav';
import { Hero } from '../Hero';
import { Starfield } from '../Starfield';
import { quizStart } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rootRef = useRef(null);

  const onStartHandler = () => {
    dispatch(quizStart());
    navigate(ROUTES.questions);
  };

  // Parallax: one listener writes the pointer position to two custom
  // properties and CSS moves each layer by its own multiplier. Keeping the
  // maths in CSS means the transforms stay on the compositor.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        root.style.setProperty('--px', x.toFixed(3));
        root.style.setProperty('--py', y.toFixed(3));
      });
    };

    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="app app-landing" ref={rootRef}>
      <Starfield />
      <Nav />

      <main className="landing">
        <Hero />

        <div className="landing-content">
          <span className="eyebrow">{COPY.school}</span>
          <h1 className="hero-title">{COPY.heroTitle}</h1>
          <p className="intro-description">{COPY.description}</p>
          <div className="hero-actions">
            <button onClick={onStartHandler} className="default-btn">
              {COPY.start}
            </button>
            <Link to={ROUTES.chooseLevel} className="default-btn outlined-button">
              {COPY.chooseLevel}
            </Link>
          </div>
          <p className="intro-note">{COPY.note}</p>
        </div>
      </main>
    </div>
  );
};

export default Quiz;

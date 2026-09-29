import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { COPY } from './Quiz.constants';
import { Nav } from '../Nav';
import { Hero } from '../Hero';
import { Sigil } from '../Sigil';
import { Starfield } from '../Starfield';
import { quizStart } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // The opening plays once per session — a moment on arrival, not a toll
  // paid on every replay. Anyone asking for less motion never sees it.
  const [playIntro] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      if (sessionStorage.getItem('introPlayed')) return false;
      sessionStorage.setItem('introPlayed', '1');
      return true;
    } catch {
      return false;
    }
  });

  const onStartHandler = () => {
    dispatch(quizStart());
    navigate(ROUTES.questions);
  };

  return (
    <div className={`app app-landing${playIntro ? ' is-intro' : ''}`}>
      <Starfield />
      <Nav />

      <main className="landing">
        <Hero />
        {playIntro && <Sigil className="landing-sigil" />}
        {playIntro && <div className="intro-veil" />}

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

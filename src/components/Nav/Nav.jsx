import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../assets/hp-logo.svg';
import { ROUTES } from '../../routes/Routes.constants';
import { COPY } from './Nav.constants';

export const Nav = () => {
  const { pathname } = useLocation();
  const hasStarted = useSelector((state) => state.quiz.hasStarted);
  const showScore = useSelector((state) => state.quiz.showScore);
  const isPlaying = hasStarted && !showScore;

  const linkClass = (to) =>
    `site-nav-link${pathname === to ? ' is-current' : ''}`;

  const playTo = isPlaying ? ROUTES.questions : ROUTES.home;

  const locked = (to, label) =>
    isPlaying ? (
      <span className="site-nav-link" aria-disabled="true" title={COPY.levelsLocked}>
        {label}
      </span>
    ) : (
      <Link to={to} className={linkClass(to)}>
        {label}
      </Link>
    );

  return (
    <nav className="site-nav">
      <Link to={ROUTES.home} className="site-nav-logo">
        <img className="logo" src={Logo} alt={COPY.home} />
      </Link>

      <div className="site-nav-links">
        <Link to={playTo} className={linkClass(playTo)}>
          {COPY.play}
        </Link>

        <span className="site-nav-sep" />

        {locked(ROUTES.chooseLevel, COPY.levels)}

        <span className="site-nav-sep" />

        {locked(ROUTES.about, COPY.about)}
      </div>

      <span className="site-nav-meta">{isPlaying ? COPY.inProgress : ''}</span>
    </nav>
  );
};

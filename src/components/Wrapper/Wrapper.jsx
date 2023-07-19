import { Link } from 'react-router-dom';
import Logo from '../../assets/hp-logo.svg';
import React from 'react';
import { ROUTES } from '../../routes/Routes.constants';

export const Wrapper = ({ children }) => {
  return (
    <div className="container">
      <Link to={ROUTES.home} className="logo-wrapper">
        <img className="logo" src={Logo} alt="quiz icon" />
      </Link>
      {children}
    </div>
  )
}

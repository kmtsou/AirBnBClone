import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='session-login-signup'>
        <LoginFormModal />
        <NavLink to="/signup"><button className='signup-button'>Sign Up</button></NavLink>
      </div>
    );
  }

  return (
    <div className='nav-ul'>
      <div className='nav-left'>
        <NavLink exact to="/" className='home-link'>
          <div className='logo-div'><img src='https://download.logo.wine/logo/Airbnb/Airbnb-Logo.wine.png' alt='home-image' className='logo-img'></img></div>
        </NavLink>
      </div>
      <div className='nav-right'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;

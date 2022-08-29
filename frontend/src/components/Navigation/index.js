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
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='nav-ul'>
      <div>
        <NavLink exact to="/" className='home-link'>Home
          {/* <div><img src='https://download.logo.wine/logo/Airbnb/Airbnb-Logo.wine.png' alt='home-image'></img></div> */}
        </NavLink>
      </div>
      <div className='nav-li'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;

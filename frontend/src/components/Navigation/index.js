import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import myLogo from './myLogo.png';
import LoginFromHostButton from './BecomeAHost';
import SignupFormModal from '../SignupFormPage/SignupFormModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  // console.log('rendering nav')
  // console.log(showModal)
  // console.log(sessionUser)

  let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <div className='session-login-signup'>
  //       <LoginFormModal />
  //       <NavLink to="/signup"><button className='signup-button'>Sign Up</button></NavLink>
  //     </div>
  //   );
  // }
  sessionLinks = (<ProfileButton user={sessionUser} setShowModal={setShowModal} setShowSignupModal={setShowSignupModal} />)

  return (
    <div className='nav-ul'>
      <div className='nav-left'>
        <NavLink exact to="/" className='home-link'>
          {/* <div className='logo-div'><img src='https://download.logo.wine/logo/Airbnb/Airbnb-Logo.wine.png' alt='home-image' className='logo-img'></img></div> */}
          <div className='logo-div'><img src={myLogo} alt='home-logo' className='logo-img'></img></div>
        </NavLink>
      </div>
      <div className='nav-right'>
        {sessionUser && <div className='host-spot-button'>
          <NavLink to={'/spots/new'} className='host-spot-link'>Become a Host</NavLink>
        </div>}
        {/* {!sessionUser && <div className='host-spot-button'>
          Become a Host
        </div>} */}
        {!sessionUser && <LoginFromHostButton />}
        {isLoaded && sessionLinks}
      </div>
      <LoginFormModal showModal={showModal} setShowModal={setShowModal} />
      <SignupFormModal showSignupModal={showSignupModal} setShowSignupModal={setShowSignupModal} />
    </div>
  );
}

export default Navigation;

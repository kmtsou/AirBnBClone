import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory, NavLink } from 'react-router-dom';
import LoginFormModal from "../LoginFormModal";
import './ProfileButton.css'

function ProfileButton({ user, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    let loggedOut = await dispatch(sessionActions.logout());
    if (loggedOut) {
      history.push('/')
    }
  };

  return (
    <>
      <button onClick={openMenu} className="profile-dropdown-button">
        <div>
          <i className="fa fa-bars fa-2x" />
        </div>
        <div>
          <i className="fas fa-user-circle fa-2x" />
        </div>

      </button>
      {showMenu && !user && (
        <div className="session-buttons">
          {/* <LoginFormModal /> */}
          <div onClick={() => setShowModal(true)}><p>Log In</p></div>
          <NavLink to="/signup"><button className='signup-button'>Sign Up</button></NavLink>
        </div>
      )}
      {showMenu && user && (
        <ul className="profile-details">
          <li className="dropdown-item">{user.username}</li>
          <li className="dropdown-item">{user.email}</li>
          <li className="logout-button-container">
            <button onClick={logout} className="logout-button">Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

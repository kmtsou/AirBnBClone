import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {useHistory} from 'react-router-dom';
import './ProfileButton.css'

function ProfileButton({ user }) {
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
        <i className="fa fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
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

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DemoUser from './DemoUser';
import LoginForm from './LoginForm';
import './index.css'

function LoginFormModal({ showModal, setShowModal }) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)} className="login-button">Log In</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal}/>
          <div className='or-container'>
            <p className='or-line-breaker'>Or</p>
          </div>
          <DemoUser setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

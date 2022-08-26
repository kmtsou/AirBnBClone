import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DemoUser from './DemoUser';
import LoginForm from './LoginForm';
import './index.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
          <div className='or-container'>
            <p className='or-line-breaker'>Or</p>
          </div>
          <DemoUser />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DemoUser from '../LoginFormModal/DemoUser';
import LoginForm from '../LoginFormModal/LoginForm';
import './BecomeAHost.css'

function LoginFromHostButton() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)} className="host-login-button">Become a Host</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='login-reminder'>
                        <p className='login-reminder-text'>Please login first</p>
                    </div>
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

export default LoginFromHostButton;

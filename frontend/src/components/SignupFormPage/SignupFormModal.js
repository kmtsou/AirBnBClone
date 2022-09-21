import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '.';
// import './SignupForm.css'

function SignupFormModal({ showSignupModal, setShowSignupModal }) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignupFormPage setShowSignupModal={setShowSignupModal}/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;

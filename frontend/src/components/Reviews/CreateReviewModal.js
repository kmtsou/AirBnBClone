import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './CreateReviewForm';

function CreateReviewModal({ showReviewModal, setShowReviewModal }) {
  // const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showReviewModal && (
        <Modal onClose={() => setShowReviewModal(false)}>
          <CreateReviewForm showReviewModal={showReviewModal} setShowReviewModal={setShowReviewModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;

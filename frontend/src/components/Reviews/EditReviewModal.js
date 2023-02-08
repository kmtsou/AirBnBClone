import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';

const EditReviewModal = ({showEditReviewModal, setShowEditReviewModal, theReview}) => {

    return (
        <>
        {showEditReviewModal && (
        <Modal onClose={() => setShowEditReviewModal(false)}>
          <EditReviewForm showEditReviewModal={showEditReviewModal} setShowEditReviewModal={setShowEditReviewModal} theReview={theReview}/>
        </Modal>
      )}
        </>
    )
}
export default EditReviewModal;

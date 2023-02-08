import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateBooking from "./UpdateBooking";
import './UpdateBooking.css'

function UpdateBookingModal({booking, spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="booking-update-modal-button"
        onClick={() => setShowModal(true)}
      >
        Edit Booking
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBooking
            spotId={spotId}
            booking={booking}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

export default UpdateBookingModal;

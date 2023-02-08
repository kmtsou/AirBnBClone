import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteBooking from "./DeleteBooking";
import './DeleteBookings.css'


function DeleteBookingModal({ booking }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="booking-delete-modal-button" onClick={() => setShowModal(true)}>
                Delete Booking
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteBooking booking={booking} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}


export default DeleteBookingModal

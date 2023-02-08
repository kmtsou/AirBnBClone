import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkDeleteBooking } from "../../store/bookingsReducer";
import './DeleteBookings.css'

const DeleteBooking = ({ booking, setShowModal }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const handleDelete = async (e) => {
        e.preventDefault();

        let deleteBooking = await dispatch(thunkDeleteBooking(booking.id)).catch(async (res) => {
            const data = await res.json();
            let valErrors = []
            if (data && data.error && data.message) {
                valErrors.push(data.message)
            }
            setErrors(valErrors)
        })

        if (deleteBooking) {
            setShowModal(false)
        }
    }

    return (
        <div className="delete-booking-container">
            <div className="delete-booking-modal-header">Cancel Reservation</div>
            <div>Are you sure you would like to cancel your reservation?</div>
            {errors.length > 0 && (
                errors.map((error, idx) => (
                    <div key={idx}>{error}</div>
                ))
            )}
            <div className="bookings-delete-btn-container">
                <button className="bookings-cancel-delete" onClick={() => setShowModal(false)}>No</button>
                <button className="bookings-delete-button" onClick={handleDelete}>Yes</button>
            </div>
        </div>
    )
};
export default DeleteBooking;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditBooking } from "../../store/bookingsReducer";
import './UpdateBooking.css'

const UpdateBooking = ({ booking, setShowModal, spotId }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Login to make a booking")
            return;
        }

        if (validationErrors.length > 0) {
            return;
        }
        setErrors([]);
        const payload = {
            startDate,
            endDate
        };
        let updatedBooking = await dispatch(thunkEditBooking(booking.id, payload)).catch(async (res) => {
            const data = await res.json()
            let errors = []
            if (data && data.message) {
                errors.push(data.message)
            }
            setErrors(errors)
        })

        if (updatedBooking) {
            setShowModal(false)
        }
    }

    useEffect(() => {
        let errors = [];
        let today = new Date()
        let checkStart = new Date(startDate + "T00:00:00")
        let checkEnd = new Date(endDate + "T00:00:00")
        if (today > checkStart || today > checkEnd) {
            errors.push("You must book dates in the future")
        }
        if (checkStart > checkEnd) {
            errors.push("The check out date must be after the check-in date")
        }

        setValidationErrors(errors);
    }, [startDate, endDate])

    let date = new Date();
    date.setDate(date.getDate() + 1)
    let minDate = date.toISOString().split("T")[0]

    if (!user) return null;

    return (
        <div className="update-booking-modal-container">
            <div className="update-booking-modal-header">Update Booking</div>
            <form onSubmit={handleSubmit} className='update-bookings-form'>
                {validationErrors.length > 0 && (
                    <ul className='bookings-errors'>
                        {validationErrors.map((error) => <li key={error} className='bookings-error-line'>{error}</li>)}
                    </ul>
                )}
                {errors.length > 0 && (
                    <ul className='booking-errors'>
                        {errors.map((error, idx) => <li key={idx} className='bookings-error-line'>{error}</li>)}
                    </ul>
                )}
                <div className='bookings-date-inputs'>
                    <div className='booking-input-container-left'>
                        <label className='booking-input-label'>CHECK-IN</label>
                        <input
                            className='booking-input'
                            type='date'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            min={minDate}
                        ></input>
                    </div>
                    <div className='booking-input-container'>
                        <label className='booking-input-label'>CHECKOUT</label>
                        <input
                            className='booking-input'
                            type='date'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        ></input>
                    </div>
                </div>
                <div className='updated-bookings-btn-container'>
                    <button className="update-booking-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type='submit' className='update-bookings-button'>Update Booking</button>
                </div>

            </form>

        </div>
    )
};
export default UpdateBooking;

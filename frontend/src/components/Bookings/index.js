import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkGetSpotBookings, thunkCreateBooking } from '../../store/bookingsReducer';
import './BookingsPanel.css'


const BookingsPanel = ({ spot, rating }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    // const bookings = useSelector(state => state.bookings);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [errors, setErrors] = useState([]);
    // const [hasSubmitted, setHasSubmitted] = useState(false);

    // const bookingsArray = Object.values(bookings)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setHasSubmitted(true);
        if (!user) {
            alert("Login to make a booking")
            return;
        }
        if (user.id === spot.ownerId) {
            alert("Owner can't book own property")
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

        let newBooking = await dispatch(thunkCreateBooking(spot.id || spot.spot, payload)).catch(async (res) => {
            const data = await res.json()
            let errors = []
            if (data && data.message) {
                errors.push(data.message)
            }
            setErrors(errors)
        })
        if (newBooking && !newBooking.errors) {
            history.push('/bookings/current')
        }
    };

    // useEffect(() => {
    //     dispatch(thunkGetSpotBookings(spot.id || spot.spot))
    // }, [dispatch])

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


    return (
        <div className='bookings-panel-container'>
            <div className='bookings-panel-header'>
                <div>{`$${spot.price} night`}</div>
                <div className='bookings-panel-header-right'>
                    <div>
                        <i className='fa fa-star'></i>{rating}
                    </div>
                    <div className='spot-info-separator'>•</div>
                    <div>{spot.numReviews} reviews</div>
                </div>
            </div>
            <div className='bookings-panel-form-container'>
                <form onSubmit={handleSubmit} className='bookings-form'>
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
                    <div className='create-bookings-btn-container'>
                        <button type='submit' className='create-bookings-button'>Reserve</button>
                    </div>

                </form>

            </div>
            <div>You won't be charged yet</div>
            <div className='bookings-panel-footer'>
                <div className='bookings-panel-footer-details'>
                    <div className='price-details'>
                        <div>{`$${spot.price} x ${Number(new Date(endDate).getDate() - new Date(startDate).getDate())} nights`}</div>
                        <div>{`$${spot.price * Number(new Date(endDate).getDate() - new Date(startDate).getDate())}`}</div>
                    </div>
                    <div className='price-details'>
                        <div>Cleaning Fee</div>
                        <div>$45</div>
                    </div>
                    <div className='price-details'>
                        <div>Service Fee</div>
                        <div>$60</div>
                    </div>
                </div>
                <div className='price-details-total'>
                    <div>Final Total</div>
                    <div>{`$${spot.price * Number(new Date(endDate).getDate() - new Date(startDate).getDate()) + 45 + 60}`}</div>
                </div>
            </div>

        </div>
    )
}

export default BookingsPanel;

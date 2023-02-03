import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSpotBookings } from '../../store/bookingsReducer';
import './BookingsPanel.css'


const BookingsPanel = ({ spot, rating }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // const bookings = useSelector(state => state.bookings);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    // const bookingsArray = Object.values(bookings)

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    // useEffect(() => {
    //     dispatch(thunkGetSpotBookings(spot.id || spot.spot))
    // }, [])


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
                    <div className='bookings-date-inputs'>
                        <div className='booking-input-container-left'>
                            <label className='booking-input-label'>CHECK-IN</label>
                            <input
                                className='booking-input'
                                type='date'
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
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
                        <div>{`$xnights`}</div>
                        <div>{`$`}</div>
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
                    <div>{`$`}</div>
                </div>
            </div>

        </div>
    )
}

export default BookingsPanel;

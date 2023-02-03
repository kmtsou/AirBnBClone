import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSpotBookings } from '../../store/bookingsReducer';
import './BookingsPanel.css'


const BookingsPanel = ({ spot }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    // const bookings = useSelector(state => state.bookings);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
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

            </div>
            <div className='bookings-panel-form-container'>
                <form onSubmit={handleSubmit} className='bookings-form'>
                    <div className='bookings-date-inputs'>
                        <div className='booking-input-container'>
                            <label className='booking-input-label'>CHECK-IN</label>
                            <input
                                className='booking-input'
                                type='date'
                            ></input>
                        </div>
                        <div className='booking-input-container'>
                            <label className='booking-input-label'>CHECKOUT</label>
                            <input
                                className='booking-input'
                                type='date'
                            ></input>
                        </div>
                    </div>
                    <div className='create-bookings-btn-container'>
                        <button type='submit' className='create-bookings-button'>Reserve</button>
                    </div>

                </form>

            </div>
            <div className='bookings-panel-footer'>
                <div className='price-details'>
                    <div>{`$xnights`}</div>
                    <div></div>
                </div>
                <div className='price-details'>
                    <div>Cleaning Fee</div>
                    <div>$45</div>
                </div>
                <div className='price-details'>
                    <div>Service Fee</div>
                    <div>$60</div>
                </div>
                <div className='price-details-total'>
                    <div>Final Total</div>
                    <div></div>
                </div>
            </div>

        </div>
    )
}

export default BookingsPanel;

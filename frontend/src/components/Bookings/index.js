import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSpotBookings } from '../../store/bookingsReducer';


const BookingsPanel = ({ spot }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const bookings = useSelector(state => state.bookings);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [validationErrors, setValidationErrors] = useState([]);

    const bookingsArray = Object.values(bookings)

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        dispatch(thunkGetSpotBookings(spot.id || spot.spot))
    }, [])


    return (
        <div className='bookings-panel-container'>
            <div className='bookings-panel-header'>

            </div>
            <div className='bookings-panel-form-container'>
                <form onSubmit={handleSubmit} className='bookings-form'>
                    <div className='booking-input-container'>
                        <label className='booking-input-label'></label>
                        <input
                            className='booking-input'
                            type='date'
                        ></input>
                    </div>
                    <div className='booking-input-container'>
                        <label className='booking-input-label'></label>
                        <input
                            className='booking-input'
                            type='date'
                        ></input>
                    </div>

                </form>

            </div>
            <div className='bookings-panel-footer'>
                <div className='price-details'>
                    <div></div>
                    <div></div>
                </div>
                <div className='price-details'>
                    <div></div>
                    <div></div>
                </div>
                <div className='price-details'>
                    <div></div>
                    <div></div>
                </div>
                <div className='price-details-total'>
                    <div></div>
                    <div></div>
                </div>
            </div>

        </div>
    )
}

export default BookingsPanel;

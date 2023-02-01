import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const BookingsPanel = ({ spot }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [validationErrors, setValidationErrors] = useState([]);


    return (
        <div className='bookings-panel-container'>
            <div className='bookings-panel-header'>

            </div>
            <div className='bookings-panel-form-container'>
                <form>

                </form>

            </div>
            <div className='bookings-panel-footer'>

            </div>

        </div>
    )
}

export default BookingsPanel;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetUserBookings } from "../../store/bookingsReducer";
import { thunkGetSpots } from "../../store/spotReducer";
import './CurrentBooking.css'

const UserBookings = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookings)

    const bookingsArray = Object.values(bookings)

    useEffect(() => {
        dispatch(thunkGetUserBookings())
        // dispatch(thunkGetSpots())
    }, [])

    if (!user) history.push('/')

    if (!bookingsArray || bookingsArray.length === 0) {
        return (
            <div className="current-bookings-container">
                <div className="mybookings-header">
                    <h1>My Bookings</h1>
                    <p>Nothing currently booked</p>
                </div>
            </div>
        )
    }

    return (
        <div className="current-bookings-container">
            <div className="mybookings-header">
                <h1>My Bookings</h1>
            </div>
            <ul className="bookings-card-container">
                {bookingsArray.map((booking, i) => (
                    <div className="booking-card" key={i}>

                    </div>
                ))}

            </ul>
        </div>
    )
}

export default UserBookings;

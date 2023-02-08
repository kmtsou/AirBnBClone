import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetUserBookings } from "../../store/bookingsReducer";
import { thunkGetSpots } from "../../store/spotReducer";
import './CurrentBookings.css'
import DeleteBookingModal from "./DeleteBookingModal";
import UpdateBookingModal from "./UpdateBookingModal";

const UserBookings = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookings)

    const bookingsArray = Object.values(bookings)

    useEffect(() => {
        dispatch(thunkGetSpots())
        dispatch(thunkGetUserBookings())
    }, [])

    if (!user) history.push('/')

    if (!bookingsArray || bookingsArray.length === 0 || !bookingsArray[bookingsArray.length - 1].Spot) {
        return (
            <div className="current-bookings-container">
                <div className="mybookings-header">
                    <h1>My Bookings</h1>
                    <p>Nothing currently booked</p>
                </div>
            </div>
        )
    }

    const formatDate = (date) => {
        let formatDate = new Date(date).toUTCString().split(' ')
        return formatDate[0] + ' ' + formatDate[1] + ' ' + formatDate[2] + ', ' + formatDate[3]
    }

    return (
        <div className="current-bookings-container">
            <div className="mybookings-header">
                <h1>My Bookings</h1>
            </div>
            <ul className="bookings-card-container">
                {bookingsArray.map((booking, i) => (
                    <div className="booking-card" key={i}>
                        <div className="mybookings-image-container">
                            <NavLink className='mybookings-navlink' to={`/spots/${booking.spotId}`}>
                                <img className="mybookings-spot-image" src={booking.Spot.previewImage} alt={booking.Spot.name}
                                onError={(e) => e.target.src="https://i.imgur.com/udFhU6r.png"}
                                ></img>
                            </NavLink>
                        </div>
                        <div className="mybookings-details-container">
                            <div className="mybookings-property">{`${booking.Spot.city}`}, {`${booking.Spot.country}`}</div>
                            <div className="mybookings-date-details">
                                <div className="mybookings-date-start">{formatDate(booking.startDate)}</div>
                                <div className="date-separator">-</div>
                                <div className="mybookings-date-end">{formatDate(booking.endDate)}</div>
                            </div>
                            <div className="mybookings-price">{`${booking.Spot.price} per night`}</div>
                        </div>
                        <div className="mybookings-button-container">
                            <UpdateBookingModal booking={booking} />
                            <DeleteBookingModal booking={booking}/>
                        </div>
                    </div>
                ))}

            </ul>
        </div>
    )
}

export default UserBookings;

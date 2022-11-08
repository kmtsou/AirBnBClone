import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = 'bookings/getBookings';
const LOAD_CURRENT_USER_BOOKINGS = 'bookings/loadCurrentUserBookings'
const CREATE_BOOKING = 'bookings/createBooking';
const DELETE_BOOKING = 'bookings/deleteBooking';
const UPDATE_BOOKING = 'bookings/updateBooking';

export const loadSpotBookings = (data) => {
    return {
        type: LOAD_BOOKINGS,
        payload: data
    }
};

export const loadCurrentUserBookings = (data) => {
    return {
        type: LOAD_CURRENT_USER_BOOKINGS,
        payload: data
    }
};

export const createBooking = (data) => {
    return {
        type: CREATE_BOOKING,
        payload: data
    }
};

export const deleteBooking = (id) => {
    return {
        type: DELETE_BOOKING,
        id: id
    }
};

export const updateBooking = (data, id) => {
    return {
        type: UPDATE_BOOKING,
        id: id,
        data
    }
};

export const thunkGetSpotBookings = (id) => async dispatch => {
    const responce = await csrfFetch(`/api/spots/${id}/bookings`);

    if (responce.ok) {
        const list = await responce.json();
        dispatch(loadSpotBookings(list));
    }
};

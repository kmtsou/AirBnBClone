import { csrfFetch } from "./csrf";

const LOAD_SPOT_BOOKINGS = 'bookings/getSpotBookings';
const LOAD_CURRENT_USER_BOOKINGS = 'bookings/loadCurrentUserBookings'
const CREATE_BOOKING = 'bookings/createBooking';
const DELETE_BOOKING = 'bookings/deleteBooking';
const UPDATE_BOOKING = 'bookings/updateBooking';

const loadSpotBookings = (data) => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        payload: data
    }
};

const loadCurrentUserBookings = (data) => {
    return {
        type: LOAD_CURRENT_USER_BOOKINGS,
        payload: data
    }
};

const createBooking = (data) => {
    return {
        type: CREATE_BOOKING,
        payload: data
    }
};

const deleteBooking = (id) => {
    return {
        type: DELETE_BOOKING,
        id: id
    }
};

const updateBooking = (data, id) => {
    return {
        type: UPDATE_BOOKING,
        id: id,
        data
    }
};

export const thunkGetSpotBookings = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadSpotBookings(list));
        return list;
    }
};

export const thunkGetUserBookings = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadCurrentUserBookings(data));
        return data;
    }
};

export const thunkCreateBooking = (spotId, booking) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createBooking(data))
        return data;
    }
}

export const thunkEditBooking = (id, booking) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateBooking(data))
        return data;
    }
}

export const thunkDeleteBooking = (id) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteBooking(data))
        return data;
    }

}

const bookingsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOT_BOOKINGS:
            let loadState = {};
            action.payload.forEach(booking => {
                loadState[booking.id] = booking
            })
            return loadState;
        case CREATE_BOOKING:
            let createState = { ...state }
            createState[action.payload.id] = action.payload
            return createState;
        case UPDATE_BOOKING:
            let updatedState = { ...state }
            updatedState[action.payload.id] = action.payload
            return updatedState;
        case DELETE_BOOKING:
            let deleteState = { ...state }
            delete deleteState[action.id]
            return deleteState;
        case LOAD_CURRENT_USER_BOOKINGS:
            let loadUserBookings = {};
            action.payload.forEach(booking => {
                loadUserBookings[booking.id] = booking
            })
            return loadUserBookings;
        default:
            return state;
    }
};

export default bookingsReducer;

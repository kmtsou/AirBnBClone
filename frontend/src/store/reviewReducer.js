import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews';
const LOAD_CURRENT_USER_REVIEWS = 'reviews/loadCurrentUserReviews'
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';
const EDIT_REVIEW = 'reviews/editReview';
// const CLEAR_REVIEWS = 'reviews/clearReviews';

// export const clearReviews = () => {
//     return {
//         type: CLEAR_REVIEWS
//     }
// }

export const loadSpotReviews = (data) => {
    return {
        type: LOAD_REVIEWS,
        payload: data
    }
};

export const loadCurrentUserReviews = (data) => {
    return {
        type: LOAD_CURRENT_USER_REVIEWS,
        payload: data
    }
};

export const createReview = (data) => {
    return {
        type: CREATE_REVIEW,
        payload: data
    }
};

export const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id: id
    }
};

const editReview = (data) => {
    return {
        type: EDIT_REVIEW,
        payload: data
    }
}

export const thunkGetSpotReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadSpotReviews(list));
    }
};

export const thunkGetUserReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current');

    if (response.ok) {
        const list = await response.json();
        let { Reviews } = list
        dispatch(loadCurrentUserReviews(Reviews))
    }
};

export const thunkCreateReview = (data, id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(createReview(review));
        return review;
    }
};

export const thunkDeleteReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        const review = await response.json();
        dispatch(deleteReview(id))
        return review;
    }
};

export const thunkEditReview = (id, payload) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(editReview(data));
        return data;
    }
};

const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const reviews = {}
            action.payload.forEach(review => {
                reviews[review.id] = review
            });
            return reviews;
        case LOAD_CURRENT_USER_REVIEWS:
            const userReviews = {}
            action.payload.forEach(review => {
                userReviews[review.id] = review
            });
            return userReviews;
        case CREATE_REVIEW:
            return { ...state, [action.payload.id]: { ...action.payload } };
        case DELETE_REVIEW:
            let newState = { ...state }
            delete newState[action.id]
            return newState;
        case EDIT_REVIEW:
            let editState = { ...state }
            editState[action.payload.id] = action.payload
            return editState;
        // case CLEAR_REVIEWS:
        //     return {}
        default:
            return state;
    }
};

export default reviewReducer;

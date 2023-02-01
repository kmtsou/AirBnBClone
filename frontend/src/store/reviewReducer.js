import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews';
const LOAD_CURRENT_USER_REVIEWS = 'reviews/loadCurrentUserReviews'
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';
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
        // case CLEAR_REVIEWS:
        //     return {}
        default:
            return state;
    }
};

export default reviewReducer;

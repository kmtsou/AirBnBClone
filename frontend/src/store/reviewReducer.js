import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';

export const loadSpotReviews = (data) => {
    return {
        type: LOAD_REVIEWS,
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

export const thunkGetReviews = (id) => async dispatch => {
    const responce = await csrfFetch(`/api/spots/${id}/reviews`);

    if (responce.ok) {
        const list = await responce.json();
        let { Reviews } = list
        dispatch(loadSpotReviews(Reviews));
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
    const responce = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (responce.ok) {
        const review = await responce.json();
        dispatch(deleteReview(id))
        return review;
    }
};

import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const LOAD_ONE_SPOT = 'spots/loadOneSpot';
const LOAD_CURRENT_USER_SPOTS = 'spots/loadCurrentUserSpots'
const ADD_IMAGE_TO_SPOT = 'spots/images/addSpotImage'
const DELETE_IMAGE_FROM_SPOT = 'spots/images/removeSpotImage'

export const loadSpots = (data) => {
    return {
        type: LOAD_SPOTS,
        payload: data
    }
}

export const loadOneSpot = (data) => {
    return {
        type: LOAD_ONE_SPOT,
        data
    }
}

export const loadCurrentUserSpots = (data) => {
    return {
        type: LOAD_CURRENT_USER_SPOTS,
        payload: data
    }
}

export const createSpot = (data) => {
    return {
        type: CREATE_SPOT,
        payload: data
    }
}

export const updateSpot = (data) => {
    return {
        type: UPDATE_SPOT,
        payload: data
    }
}

export const deleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id: id
    }
}

export const addImageToSpot = (data, id) => {
    return {
        type: ADD_IMAGE_TO_SPOT,
        payload: data,
        id: id
    }
}

const removeImageFromSpot = (id, spotId) => {
    return {
        type: DELETE_IMAGE_FROM_SPOT,
        id,
        spotId
    }
}

export const thunkGetSpots = () => async dispatch => {
    const responce = await csrfFetch('/api/spots');

    if (responce.ok) {
        const list = await responce.json();
        let { Spots } = list
        dispatch(loadSpots(Spots));
    }
};

export const thunkGetOneSpot = (id) => async dispatch => {
    const responce = await fetch(`/api/spots/${id}`);

    if (responce.ok) {
        const spot = await responce.json();
        dispatch(loadOneSpot(spot));
    }
};

export const thunkGetCurrentUserSpots = () => async dispatch => {
    const responce = await csrfFetch('/api/spots/current');

    if (responce.ok) {
        const list = await responce.json();
        dispatch(loadCurrentUserSpots(list));
    }
};

export const thunkUpdateSpot = (data, id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(updateSpot(spot));
        return spot;
    }
}

export const thunkCreateSpot = (data) => async dispatch => {
    const response = await csrfFetch(`/api/spots/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(createSpot(spot));
        return spot;
    }
}

export const thunkDeleteSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteSpot(id));
        return spot;
    }
}

export const thunkAddSpotImage = (data, id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const image = await response.json();
        dispatch(addImageToSpot(data.url, id))
        return image;
    }
}

export const thunkRemoveSpotImage = (id, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/images/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        const image = await response.json();
        dispatch(removeImageFromSpot(id, spotId))
        return image;
    }
}

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const spots = {};
            action.payload.forEach(spot => {
                spots[spot.spot] = spot
            });
            return { ...spots };
        case CREATE_SPOT:
            return { ...state, [action.payload.id]: { ...action.payload } };
        case UPDATE_SPOT:
            return { ...state, [action.payload.id]: { ...state[action.payload.id], ...action.payload } };
        case DELETE_SPOT:
            let newState = { ...state }
            delete newState[action.id]
            return newState;
        case ADD_IMAGE_TO_SPOT:
            return { ...state, [action.id]: { ...state[action.id], previewImage: action.payload } };
        case DELETE_IMAGE_FROM_SPOT:
            let removeImgState = {...state}
            return removeImgState;
        case LOAD_ONE_SPOT:
            let spotState = {...state}
            spotState[action.data.spot] = action.data
            return spotState;
        case LOAD_CURRENT_USER_SPOTS:
            const userSpots = {};
            action.payload.forEach(spot => {
                userSpots[spot.spot] = spot
            });
            return { ...userSpots };
        default:
            return state;
    }
};

export default spotReducer;

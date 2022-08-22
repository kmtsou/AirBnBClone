const LOAD_SPOTS = 'spots/loadSpots';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';

export const loadSpots = (data) => {
    return {
        type: LOAD_SPOTS,
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

export const thunkGetSpots = () => async dispatch => {
    const responce = await fetch('/api/spots');

    if (responce.ok) {
        const list = await responce.json();
        dispatch(loadSpots(list));
    }
};

export const thunkUpdateSpot = (data) => async dispatch => {
    const response = await fetch(`/api/spots/${data.id}`, {
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
    const response = await fetch(`/api/spots/`, {
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

export const thunkDeleteSpot = (data) => async dispatch => {
    const response = await fetch(`/api/spots/${data.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteSpot(spot));
        return spot;
    }
}

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const allSpots = {};
            action.payload.forEach(spot => {
                allSpots[payload.id] = spot
            });
            return { ...allSpots, ...state };
        case CREATE_SPOT:
            return { ...state, [action.payload.id]: { ...action.payload } };
        case UPDATE_SPOT:
            return { ...state, [action.payload.id]: { ...action.payload } };
        case DELETE_SPOT:
            let newState = { ...state }
            delete newState[action.id]
            return newState;
        default:
            return state;
    }
};

export default spotReducer;

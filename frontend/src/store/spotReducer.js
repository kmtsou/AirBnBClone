import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';
// const LOAD_ONE_SPOT = 'spots/loadOneSpot';

export const loadSpots = (data) => {
    return {
        type: LOAD_SPOTS,
        payload: data
    }
}

// export const loadOneSpot = (data) => {
//     return {
//         type: LOAD_ONE_SPOT,
//         payload: data
//     }
// }

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
    const responce = await csrfFetch('/api/spots');

    if (responce.ok) {
        const list = await responce.json();
        let { Spots } = list
        dispatch(loadSpots(Spots));
    }
};

// export const thunkGetOneSpot = (data) => async dispatch => {
//     const responce = await fetch(`/api/spots/${data.spot}`);

//     if (responce.ok) {
//         const spot = await responce.json();
//         dispatch(loadOneSpot(spot));
//     }
// };

export const thunkUpdateSpot = (data, id) => async dispatch => {
    console.log(data)
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
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(id)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteSpot(id));
        return spot;
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

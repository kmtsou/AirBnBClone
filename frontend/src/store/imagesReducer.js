// import { csrfFetch } from "./csrf";

// const LOAD_PREVIEW_IMAGE = 'images/loadPreviewImage'
// const ADD_IMAGE_TO_SPOT = 'spots/images/addSpotImage'

// export const loadSpotImage = (data) => {
//     return {
//         type: LOAD_PREVIEW_IMAGE,
//         payload: data
//     }
// }

// export const addImageToSpot = (data) => {
//     return {
//         type: ADD_IMAGE_TO_SPOT,
//         payload: data
//     }
// }

// export const thunkAddSpotImage = (data, id) => async dispatch => {
//     const responce = await csrfFetch(`/api/spots/${id}/images`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     })
//     if (responce.ok) {
//         const image = await responce.json();
//         dispatch(addImageToSpot(data))
//         return image;
//     }
// }

// const imageReducer = (state = {}, action) => {
//     switch (action.type) {
//         case LOAD_PREVIEW_IMAGE:
//             return;
//         case ADD_IMAGE_TO_SPOT:

//         default:
//             return state;
//     }
// };
// export default imageReducer

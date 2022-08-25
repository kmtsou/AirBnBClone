import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkDeleteReview } from "../../store/reviewReducer";
import { thunkGetSpots } from "../../store/spotReducer";

const DeleteReviewButton = ({ review }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const deleteReview = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteReview(review.id)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        dispatch(thunkGetSpots()); // to update avgRating
    }
    return (
        <button onClick={deleteReview}>Delete review</button>
    )
}

export default DeleteReviewButton;

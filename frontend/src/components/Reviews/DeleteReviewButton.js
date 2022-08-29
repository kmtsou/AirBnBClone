import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkDeleteReview } from "../../store/reviewReducer";
import { thunkGetSpots } from "../../store/spotReducer";
import './DeleteReviewButton.css'

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
        <div className="delete-review-button-container">
            <button onClick={deleteReview} className='delete-review-button'>Delete your review</button>
        </div>
    )
}

export default DeleteReviewButton;

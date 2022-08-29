import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkDeleteReview, thunkGetSpotReviews } from "../../store/reviewReducer";
import { thunkGetOneSpot } from "../../store/spotReducer";
import { useParams } from "react-router-dom";
import './DeleteReviewButton.css'

const DeleteReviewButton = ({ review }) => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [errors, setErrors] = useState([]);
    const deleteReview = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteReview(review.id)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        dispatch(thunkGetSpotReviews(spotId))
        dispatch(thunkGetOneSpot(spotId)); // to update avgRating
    }
    return (
        <div className="delete-review-button-container">
            <button onClick={deleteReview} className='delete-review-button'>Delete your review</button>
        </div>
    )
}

export default DeleteReviewButton;

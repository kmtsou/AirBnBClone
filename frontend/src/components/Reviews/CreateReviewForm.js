import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateReview, thunkGetSpotReviews } from "../../store/reviewReducer";
import { thunkGetOneSpot } from "../../store/spotReducer";
import './CreateReviewForm.css';

const CreateReviewForm = ({ spot }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            review,
            stars
        }
        let currentSpotId = spot.spot || spot.id;
        let createdReview = await dispatch(thunkCreateReview(payload, currentSpotId)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        if (createdReview) {
            dispatch(thunkGetSpotReviews(spot.spot || spot.id))
            dispatch(thunkGetOneSpot(spot.spot || spot.id)) // to update avgRating
        }
        setReview('');
        setStars(0);
    }

    return (
        <section className="create-review-section">
            <form onSubmit={handleSubmit} className="review-form">
                <div className="review-line-item">
                    <label className="review-label">
                        Leave a review:
                    </label>
                    <textarea
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        required
                        className="review-textarea"
                    />
                </div>
                <div className="stars-and-submit">
                    <div className="review-submit-container">
                        <button type="submit" className="review-submit-button">Submit review</button>
                    </div>
                    <div className="review-stars">
                        <label>
                            {/* Star rating: */}
                            <i className="fa fa-star"></i>
                        </label>
                        <input
                            type="number"
                            min='0'
                            max='5'
                            value={stars}
                            onChange={e => setStars(e.target.value)}
                            required
                            className="review-star-input"
                        />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default CreateReviewForm;

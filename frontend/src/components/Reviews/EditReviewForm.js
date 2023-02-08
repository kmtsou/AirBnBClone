import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkEditReview, thunkGetSpotReviews } from "../../store/reviewReducer";
import { thunkGetOneSpot } from "../../store/spotReducer";
import './CreateReviewForm.css';
import './EditReviewForm.css'

const EditReviewForm = ({ theReview, setShowEditReviewModal }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);
    const [review, setReview] = useState(theReview.review);
    const [stars, setStars] = useState(theReview.stars);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [valErrors, setValErrors] = useState([]);

    useEffect(() => {
        let newErrors = [];
        if (review.length < 5) {
            newErrors.push('Please leave a review of atleast 5 characters')
        }
        setValErrors(newErrors);
    }, [review])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (valErrors.length > 0) {
            return;
        }
        const payload = {
            review,
            stars
        }
        let currentSpotId = spot.spot || spot.id;
        let edittedReview = await dispatch(thunkEditReview(theReview.id, payload)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        if (edittedReview) {
            dispatch(thunkGetSpotReviews(spot.spot || spot.id))
            dispatch(thunkGetOneSpot(spot.spot || spot.id)) // to update avgRating
        }
        setReview('');
        setStars(0);
        setShowEditReviewModal(false);
    }

    return (
        <section className="create-review-section">
            <form onSubmit={handleSubmit} className="review-form">
                <div className="review-header">
                    <div className="review-header-text">Leave a review</div>
                </div>
                {hasSubmitted && valErrors.length > 0 && (
                    <div>
                        <div className="error-header-text">
                            The following errors were found:
                        </div>
                        <ul>
                            {valErrors.map((error) => (
                                <li key={error} className='val-errors'>{error}</li>
                            ))}
                            {errors.map((error, idx) => <li key={idx} className='spot-val-error-line'>{error}</li>)}
                        </ul>
                    </div>
                )}
                <div className="review-line-item">
                    {/* <label className="review-label">
                        Leave a review:
                    </label> */}
                    <textarea
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        required
                        className="review-textarea"
                    />
                </div>
                <div className="review-stars">
                    <label>
                        {/* Star rating: */}
                        <i className="fa fa-star"></i>
                    </label>
                    <input
                        type="number"
                        min='1'
                        max='5'
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                        required
                        className="review-star-input"
                    />
                </div>
                <div className="edit-review-submit-container">
                    <button className="edit-review-cancel" onClick={() => setShowEditReviewModal(false)}>Cancel</button>
                    <button type="submit" className="review-submit-button">Submit review</button>
                </div>
            </form>
        </section>
    )
}
export default EditReviewForm;

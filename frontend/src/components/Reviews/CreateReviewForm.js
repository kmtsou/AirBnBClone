import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateReview, thunkGetSpotReviews } from "../../store/reviewReducer";

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
        }
        setReview('');
        setStars(0);
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label>
                    Leave a review:
                    <textarea
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Star rating:
                    <input
                        type="number"
                        min='0'
                        max='5'
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit review</button>
            </form>
        </section>
    )
}

export default CreateReviewForm;

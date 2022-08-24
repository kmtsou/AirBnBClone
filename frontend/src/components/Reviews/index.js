import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetSpotReviews } from "../../store/reviewReducer";
import CreateReviewForm from "./CreateReviewForm";
import ReviewIndexItem from "./ReviewIndexItem";
// import { clearReviews } from "../../store/reviewReducer";

const ReviewIndex = ({ spot, user }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(thunkGetSpotReviews(spot.spot || spot.id))
        // return dispatch(clearReviews)
    }, [dispatch, spot.spot, spot.id])
    if (!reviews) return null;
    const reviewArr = Object.values(reviews);
    const filteredArr = reviewArr.filter(review => review.spotId === (spot.spot || spot.id))
    if (filteredArr.length === 0) return <div>No reviews yet!</div>

    return (
        <div>
            <div>
                {filteredArr.map(review => (
                    <ReviewIndexItem review={review} key={`review ${review.id}`}/>
                ))}
            </div>
            {user && user.id !== spot.ownerId && (
            <div>
                <CreateReviewForm spot={spot}/>
            </div>)}
        </div>
    )
};

export default ReviewIndex;

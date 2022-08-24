import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetSpotReviews } from "../../store/reviewReducer";
import ReviewIndexItem from "./ReviewIndexItem";
import { clearReviews } from "../../store/reviewReducer";

const ReviewIndex = ({ spot }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)

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
        </div>
    )
};

export default ReviewIndex;

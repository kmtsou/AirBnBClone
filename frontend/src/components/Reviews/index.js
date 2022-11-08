import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetSpotReviews } from "../../store/reviewReducer";
import CreateReviewForm from "./CreateReviewForm";
import ReviewIndexItem from "./ReviewIndexItem";
import CreateReviewModal from "./CreateReviewModal";
// import { clearReviews } from "../../store/reviewReducer";
import './index.css'

const ReviewIndex = ({ spot, user }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)
    const [showReviewModal, setShowReviewModal] = useState(false);
    // console.log(spot)

    useEffect(() => {
        dispatch(thunkGetSpotReviews(spot.spot || spot.id))
        // return dispatch(clearReviews)
    }, [dispatch, spot.spot, spot.id])
    if (!reviews) return null;
    const reviewArr = Object.values(reviews);
    // console.log('the review arr', reviewArr)
    // const filteredArr = reviewArr.filter(review => review.spotId === (spot.spot || spot.id))
    // console.log('the filtered arr', filteredArr)
    if (reviewArr.length === 0) return (<>
        <div>No reviews yet!</div>
        {user && user.id !== spot.ownerId && (
            // <div>
            //     <CreateReviewForm spot={spot} />
            // </div>
            <div className="modal-button-container">
                <button onClick={() => setShowReviewModal(true)} className="modal-button">Leave a review</button>
            </div>
        )}
        <CreateReviewModal showReviewModal={showReviewModal} setShowReviewModal={setShowReviewModal} />
    </>)

    let madeAReview = false;
    for (let i = 0; i < reviewArr.length; i++) {
        if (user && user.id === reviewArr[i].userId) {
            madeAReview = true;
        }
    }

    return (
        <div>
            <div>
                {reviewArr.map(review => (
                    <ReviewIndexItem review={review} key={`review ${review.id}`} />
                ))}
            </div>
            {user && user.id !== spot.ownerId && !madeAReview && (
                // <div>
                //     <CreateReviewForm spot={spot} />
                // </div>
                <div className="modal-button-container">
                    <button onClick={() => setShowReviewModal(true)} className="modal-button">Leave a review</button>
                </div>
            )}
            <CreateReviewModal showReviewModal={showReviewModal} setShowReviewModal={setShowReviewModal} />
        </div>
    )
};

export default ReviewIndex;

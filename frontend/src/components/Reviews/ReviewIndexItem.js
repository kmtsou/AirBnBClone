import { useSelector } from "react-redux";
import { useState } from "react";
// import spotReducer from "../../store/spotReducer";
// import { useParams } from "react-router-dom";
import './ReviewIndexItem.css'

import DeleteReviewButton from "./DeleteReviewButton";
import EditReviewModal from "./EditReviewModal";


const ReviewIndexItem = ({ review }) => {
    const user = useSelector(state => state.session.user)
    const [showEditReviewModal, setShowEditReviewModal] = useState(false)

    if (!review || !review.User) return <div>No reviews yet!</div>;

    return (
        <div className="single-review-container">
            <div>
                <p>{review.User.firstName} {review.User.lastName}</p>
                <div><i className="fa fa-star"></i> {review.stars}</div>
            </div>
            <div>
                <p>{review.review}</p>
            </div>
            {user && user.id === review.userId && (
                <div>
                    <div className="edit-review-button-container">
                        <button onClick={() => setShowEditReviewModal(true)} className='edit-review-button'>Edit review</button>
                    </div>
                    <DeleteReviewButton review={review} />
                </div>
            )}
            <EditReviewModal showEditReviewModal={showEditReviewModal} setShowEditReviewModal={setShowEditReviewModal} theReview={review} />
        </div>
    )
};

export default ReviewIndexItem;

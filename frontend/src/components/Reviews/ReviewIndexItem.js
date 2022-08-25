import { useSelector } from "react-redux";
import spotReducer from "../../store/spotReducer";
// import { useParams } from "react-router-dom";

import DeleteReviewButton from "./DeleteReviewButton";


const ReviewIndexItem = ({ review }) => {
    const user = useSelector(state => state.session.user)

    if (!review || !review.User) return <div>No reviews yet!</div>;

    return (
        <div>
            <div>
                <p>{review.User.firstName} {review.User.lastName}</p>
                <div>stars: {review.stars}</div>
            </div>
            <div>
                <p>{review.review}</p>
            </div>
            {user && user.id === review.userId && (
                <div>
                    <DeleteReviewButton review={review} />
                </div>
            )}

        </div>
    )
};

export default ReviewIndexItem;

// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";


const ReviewIndexItem = ({ review }) => {

    if (!review) return <div>No reviews yet!</div>;

    return (
        <div>
            <div>
                <p>{review.User.firstName} {review.User.lastName}</p>
                <div>stars: {review.stars}</div>
            </div>
            <div>
                <p>{review.review}</p>
            </div>
        </div>
    )
};

export default ReviewIndexItem;

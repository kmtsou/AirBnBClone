import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkDeleteSpot, thunkGetOneSpot } from '../../store/spotReducer';
import { useState, useEffect } from 'react';
import ReviewIndex from '../Reviews';
import './SpotShow.css';

const SpotShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const user = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.reviews);

  useEffect(() => {
    dispatch(thunkGetOneSpot(spotId))
  }, [dispatch])

  const deleteSpot = async (e) => {
    e.preventDefault();
    let deletedSpot = await dispatch(thunkDeleteSpot(spot.spot || spot.id)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    if (deletedSpot) {
      history.push('/');
    }
  }
  if (!spot) return null;
  let n = 3.0
  let rating = n.toFixed(1);
  if (spot.avgRating) {
    rating = (spot.avgRating).toFixed(1)
  }

  // let numReviews = 0;
  // for (const review in reviews) {
  //   numReviews = numReviews + 1;
  // }

  return (
    <>
      <section className='spot-details-page'>
        <div className='spot-details-header'>
          <h1>{spot.name}</h1>
          <div className='spot-info'>
            <div className='spot-info-rating'>
              <i className='fa fa-star'></i>{rating}
            </div>
            <div className='spot-info-separator'>.</div>
            <div>{spot.numReviews} reviews</div>
            <div className='spot-info-separator'>.</div>
            <h4>
              {spot.address}, {spot.city}, {spot.state}
            </h4>
          </div>
        </div>
        {/* Spot ID: {spot.spot || spot.id} */}
        <div className='spot-show-image-container'>
          <img src={spot.previewImage || spot.url || spot.Images[0].url} alt='preview' className='spot-show-photo'></img>
        </div>
        <div className='spot-bottom-description'>
          {spot.Owner && (<h4>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h4>)}
          <div className='price-line'>price per night: <div className='spot-bold-price-tag'>${spot.price}</div></div>
          <p>{spot.description}</p>
        </div>
        {/* <Link to="/">Back to Spot Index</Link> */}
      </section>
      <section className='review-section'>
        <div className='review-container'>
          <h4>Reviews:</h4>
          <ReviewIndex spot={spot} user={user} />
        </div>
      </section>

      {user && user.id === spot.ownerId && (
        <div className='spot-owner-buttons'>
          <button onClick={deleteSpot} className="spot-owner-delete-button">Delete Spot</button>
          <Link to={`/spots/${spotId}/update`} className='spot-owner-update-link'>
            <button className='spot-owner-update-button'>Update Spot</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default SpotShow;

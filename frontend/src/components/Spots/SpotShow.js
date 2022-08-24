import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkDeleteSpot } from '../../store/spotReducer';
import { useState } from 'react';
import ReviewIndex from '../Reviews';

const SpotShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const user = useSelector(state => state.session.user);
  const deleteSpot = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteSpot(spot.spot || spot.id)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    history.push('/');
  }
  if (!spot) return null;
  return (
    <>
      <section>
        <h1>{spot.name}</h1>
        <div className='spot-info'>
          <div>{spot.avgRating}</div>
          {/* <div>{spot.numReviews}</div> */}
          <h3>
            {spot.address}, {spot.city}, {spot.state}
            </h3>
          </div>
        Spot ID: {spot?.spot}
        <div><img src={spot.previewImage} alt='preview'></img></div>

        <p>price per night: {spot.price}</p>
        <p>{spot.description}</p>
        <Link to="/">Back to Spot Index</Link>
      </section>
      <section>
        <h4>Reviews:</h4>
        <ReviewIndex spot={spot}/>
      </section>

      {user && user.id === spot.ownerId && (
        <>
          <button onClick={deleteSpot}>Delete Spot</button>
          <Link to={`/spots/${spotId}/update`}>
            <button>Update Spot</button>
          </Link>
        </>
      )}
    </>
  );
}

export default SpotShow;

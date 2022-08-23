import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkDeleteSpot } from '../../store/spotReducer';
import { useState } from 'react';

const SpotShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);
  const user = useSelector(state => state.session.user);
  const deleteSpot = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteSpot(spot.spot)).catch(async (res) => {
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
        Spot ID: {spot?.spot}
        <img src={spot.previewImage} alt='preview'></img>
        <h3>{spot.address}, {spot.city}, {spot.state}</h3>
        <p>price per night: {spot.price}</p>
        <p>{spot.description}</p>
        <Link to="/">Back to Spot Index</Link>
      </section>
      <button onClick={deleteSpot}>Delete Spot</button>
      {user && (<Link to={`/spots/${spotId}/update`}>
        <button>Update Spot</button>
      </Link>)}
    </>
  );
}

export default SpotShow;

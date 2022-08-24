import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { thunkGetSpots } from '../../store/spotReducer';
import SpotIndexItem from './SpotIndexItem';
import './Spots.css';

const SpotIndex = () => {
    const spots = useSelector(state => state.spots)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

    if (!spots) { return null; }
    const spotsArr = Object.values(spots);

    return (
        <div>
            <ul className='card-container'>
                {spotsArr.map(spot => (
                    <SpotIndexItem spot={spot} key={`spot ${spot.spot}`} />
                ))}
            </ul>
            {user && (<Link to={`/spots/new`}>
                <button className='create-spot-button'>Create a Spot</button>
            </Link>)}
        </div>
    )
};

export default SpotIndex;

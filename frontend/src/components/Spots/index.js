import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { thunkGetSpots } from '../../store/spotReducer';
import SpotIndexItem from './SpotIndexItem';
import './index.css';

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
        <div className='splash-page'>
            <ul className='card-container'>
                {spotsArr.map(spot => (
                    <SpotIndexItem spot={spot} key={`spot ${spot.spot || spot.id}`} />
                ))}
            </ul>
            {/* {user && (<div className='create-spot-container'>
                <Link to={`/spots/new`} className='create-spot-link'>
                    <button className='create-spot-button'>Host a Spot!</button>
                </Link>
            </div>)} */}
        </div>
    )
};

export default SpotIndex;

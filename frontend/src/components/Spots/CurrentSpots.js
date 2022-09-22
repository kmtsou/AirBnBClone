import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { thunkGetCurrentUserSpots } from '../../store/spotReducer';
import SpotIndexItem from './SpotIndexItem';
import './CurrentSpots.css'

const UserSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetCurrentUserSpots())
    }, [dispatch])

    if (!spots) return null;
    const currentSpotsArr = Object.values(spots);
    return (
        <div className='current-spots-container'>
            <ul className='spot-card-container'>
                {currentSpotsArr.map(spot => (
                    <SpotIndexItem spot={spot} key={`spot ${spot.spot || spot.id}`} />
                ))}
            </ul>
        </div>
    )
}

export default UserSpots;

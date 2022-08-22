import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { thunkGetSpots } from '../../store/spotReducer';
import SpotIndexItem from './SpotIndexItem';

const SpotIndex = () => {
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetSpots)
    }, [dispatch])

    if (!spots) {return null;}

    return (
        <div>
            <ul>
                {spotsArr.map(spot => (
                    <SpotIndexItem spot={spot} key={`spot ${spot.id}`}/>
                ))}
            </ul>
            <Link to="/reports/new">New Report</Link>
        </div>
    )
};

export default SpotIndex;

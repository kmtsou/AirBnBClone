import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const spotIndex = () => {
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots);
    const dispatch = useDispatch();

    return (
        <div>
            <ul>
                {spotsArr.map(spot => (
                    <SpotIndexItem />
                ))}
            </ul>
        </div>
    )
};

export default spotIndex;

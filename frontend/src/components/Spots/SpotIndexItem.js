import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { thunkCreateSpot } from '../../store/spotReducer';

const SpotIndexItem = ({ spot }) => {
    // const dispatch = useDispatch();
    // const createASpot = (e) => {
    //     e.preventDefault();
    //     dispatch(thunkCreateSpot());
    // }

    return (
        <>
            <li>
                <Link to={`/spots/${spot.spot}`}>spot #{spot.spot}</Link>
            </li>
        </>
    );
};

export default SpotIndexItem;

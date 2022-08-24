import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { thunkCreateSpot } from '../../store/spotReducer';
import './Spot.css';

const SpotIndexItem = ({ spot }) => {
    // const dispatch = useDispatch();
    // const createASpot = (e) => {
    //     e.preventDefault();
    //     dispatch(thunkCreateSpot());
    // }

    return (
        <>
            <Link to={`/spots/${spot.spot}`} className='link-spot'>
                <li className='spot-base'>
                    <div className='spot-img'></div>
                    <div className='spot-header'>
                        <h3>{spot.city}, {spot.state}</h3>
                        <div>{spot.avgRating}</div>
                    </div>
                    <p>${spot.price} night</p>
                </li>
            </Link>
        </>
    );
};

export default SpotIndexItem;

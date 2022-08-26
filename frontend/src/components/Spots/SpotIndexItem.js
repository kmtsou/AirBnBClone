import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { thunkCreateSpot } from '../../store/spotReducer';
import './SpotIndexItem.css';

const SpotIndexItem = ({ spot }) => {
    // const dispatch = useDispatch();
    // const createASpot = (e) => {
    //     e.preventDefault();
    //     dispatch(thunkCreateSpot());
    // }
    let n = 3
    let rating = n.toFixed(1);
    if (spot.avgRating) {
        rating = (spot.avgRating).toFixed(1)
    }

    return (
        <>
            <Link to={`/spots/${spot.spot}`} className='link-spot'>
                <li className='spot-base'>
                    <div className='spot-img'></div>
                    <div className='spot-header'>
                        <h3>{spot.city}, {spot.state}</h3>
                        <div>{rating}</div>
                    </div>
                    <p>${spot.price} night</p>
                </li>
            </Link>
        </>
    );
};

export default SpotIndexItem;

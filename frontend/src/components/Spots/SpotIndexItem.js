import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <div className='spot-card-div'>
            <NavLink to={`/spots/${spot.spot}`} className='link-spot'>
                <li className='spot-base'>
                    <div className='display-bucket'>
                        <img src={spot.previewImage} className='img-thumbnail' alt='thumbnail'></img>
                    </div>
                    <div className='spot-header'>
                        <h3>{spot.city}, {spot.state}</h3>
                        <div><i className='fa fa-star'></i>{rating}</div>
                    </div>
                    <p className='spot-price-tag'>${spot.price} night</p>
                </li>
            </NavLink>
        </div>
    );
};

export default SpotIndexItem;

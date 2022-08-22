import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

const SpotIndexItem = ({ spot }) => {
//   const dispatch = useDispatch();

  return (
    <li>
      <Link to={`/spots/${spot.id}`}>spot #{spot.id}</Link>
    </li>
  );
};

export default SpotIndexItem;

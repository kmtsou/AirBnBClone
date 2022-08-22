import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SpotShow = () => {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[reportId]);

  return (
    <section>
      ID: {spot.id}
      <Link to="/">Back to Spot Index</Link>
    </section>
  );
}

export default SpotShow;

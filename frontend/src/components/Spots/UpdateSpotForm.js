import { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetOneSpot, thunkUpdateSpot } from '../../store/spotReducer';
import './UpdateSpotForm.css'

const UpdateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);
    // if (!spot) return null;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [lat, setLat] = useState(0.0);
    const [lng, setLng] = useState(0.0);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        if (spot) {
            setName(spot.name || '');
            setAddress(spot.address || '');
            setCity(spot.city || '');
            setState(spot.state || '');
            setCountry(spot.country || '');
            setDescription(spot.description || '');
            setPrice(spot.price || 0);
            setLat(spot.lat || 0.0);
            setLng(spot.lng || 0.0);
        }
    }, [spot])

    useEffect(() => {
        let errors = [];
        if (name.length < 4) {
            errors.push('Please provide a name with more than 3 characters')
        }
        if (name.length > 40) {
            errors.push('Please provide a name with 40 characters or less')
        }
        if (description.length < 5) {
            errors.push('Please provide a description with more than 4 characters')
        }
        if (isNaN(lat)) {
            errors.push('Please provide a numerical latitude')
        }
        if (isNaN(lng)) {
            errors.push('Please provide a numerical longitude')
        }
        setValidationErrors(errors);
    }, [lat, lng, name, description])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) {
            return;
        }
        setErrors([]);
        const payload = {
            name,
            address,
            city,
            state,
            country,
            description,
            lat,
            lng,
            price
        };

        let updatedSpot = await dispatch(thunkUpdateSpot(payload, spotId)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        if (updatedSpot) {
            history.push(`/spots/${updatedSpot.id}`)
        }
    };


    return (
        <section className='update-spot-form-container'>
            <form onSubmit={handleSubmit} className='update-spot-form'>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        The following errors were found:
                        <ul>
                            {validationErrors.map((error) => (
                                <li key={error} className='val-errors'>{error}</li>
                            ))}
                            {errors.map((error, idx) => <li key={idx} className='spot-val-error-line'>{error}</li>)}
                        </ul>
                    </div>
                )}
                <div className='update-spot-form-line'>
                    <label>
                        Spot name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        maxLength={50}
                        className='update-spot-form-input'
                    />
                </div>
                <div className='update-spot-form-line'>
                    <label>
                        Address:
                    </label>
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                        className='update-spot-form-input'
                    />
                </div>
                <div className='update-spot-form-line'>
                    <label>
                        City:
                    </label>
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                        className='update-spot-form-input'
                    />
                </div>
                <div className='update-spot-form-line'>
                    <label>
                        State:
                    </label>
                    <input
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                        className='update-spot-form-input'
                    />
                </div>
                <div className='update-spot-form-line'>
                    <label>
                        Country:
                    </label>
                    <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                        className='update-spot-form-input'
                    />
                </div>
                <div className='update-spot-form-line'>
                    <label>
                        Lat:
                    </label>
                    <input
                        type="text"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        required
                        className='update-spot-form-input'
                    />
                </div>
                <div className='update-spot-form-line'>
                    <label>
                        Lng:
                    </label>
                    <input
                        type="text"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        required
                        className='update-spot-form-input'
                    />
                </div>
                <div className='update-spot-form-line'>
                    <label>
                        Price per night:
                    </label>
                    <input
                        type="number"
                        value={price}
                        min="0"
                        onChange={e => setPrice(e.target.value)}
                        required
                        className='update-spot-form-input-number'
                    />
                </div>
                <div className='update-spot-form-line'>
                    <label>
                        Description:
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className='update-spot-form-textarea'
                    />
                </div>
                <div className='update-spot-button-container'>
                    <button type="submit" className='update-spot-form-button'>Update Spot</button>
                </div>
            </form>
            <div className='return-div'>
                <Link to={`/spots/${spotId}`} className='return-button-link'>
                    <button className='return-button'>Cancel</button>
                </Link>
            </div>
        </section>
    );
}

export default UpdateSpotForm;

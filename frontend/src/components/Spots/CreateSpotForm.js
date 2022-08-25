import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateSpot, thunkAddSpotImage } from '../../store/spotReducer';

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [lat, setLat] = useState(0.0);
    const [lng, setLng] = useState(0.0);
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        let errors = [];
        if (isNaN(lat)) {
            errors.push('Please provide a numerical latitude')
        }
        if (isNaN(lng)) {
            errors.push('Please provide a numerical longitude')
        }
        setValidationErrors(errors);
    }, [lat, lng])


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
        const imagePayload = {
            url,
            previewImage: true
        }

        let createdSpot = await dispatch(thunkCreateSpot(payload)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        if (createdSpot) {
            let createImage = await dispatch(thunkAddSpotImage(imagePayload, createdSpot.id)).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        }

        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit} >
                {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        The following errors were found:
                        <ul>
                            {validationErrors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <label>
                    Spot name:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        maxLength={50}
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State:
                    <input
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Lat:
                    <input
                        type="text"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Lng:
                    <input
                        type="text"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Price per night:
                    <input
                        type="number"
                        value={price}
                        min="0"
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Preview Image url:
                    <input
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create new Spot</button>
            </form>
        </section>
    );
}

export default CreateSpotForm;

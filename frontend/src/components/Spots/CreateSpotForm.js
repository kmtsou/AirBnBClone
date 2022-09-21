import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateSpot, thunkAddSpotImage } from '../../store/spotReducer';
import './CreateSpotForm.css'

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
        if (!url.includes('.com') && !url.includes('.jpg') && !url.includes('.png')) {
            errors.push('Please provide a valid image url')
        }
        setValidationErrors(errors);
    }, [lat, lng, url])


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
        <section className='create-spot-form-container'>
            <form onSubmit={handleSubmit} className='create-spot-form'>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        The following errors were found:
                        <ul>
                            {validationErrors.map((error) => (
                                <li key={error} className='val-errors'>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className='create-form-line'>
                    <label>
                        Spot name:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        maxLength={50}
                        className='create-spot-form-input'
                    />
                </div>
                <div className='create-form-line'>
                    <label>
                        Address:
                    </label>
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                        className='create-spot-form-input'
                    />
                </div>
                <div className='create-form-line'>
                    <label>
                        City:
                    </label>
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                        className='create-spot-form-input'
                    />
                </div>
                <div className='create-form-line'>
                    <label>
                        State:
                    </label>
                    <input
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                        className='create-spot-form-input'
                    />
                </div>
                <div className='create-form-line'>
                    <label>
                        Country:
                    </label>
                    <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                        className='create-spot-form-input'
                    />
                </div>
                <div className='create-form-line'>
                    <label>
                        Lat:
                    </label>
                    <input
                        type="text"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        required
                        className='create-spot-form-input'
                    />
                </div>
                <div className='create-form-line'>
                    <label>
                        Lng:
                    </label>
                    <input
                        type="text"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        required
                        className='create-spot-form-input'
                    />
                </div>
                <div className='create-form-line'>
                    <label>
                        Price per night:
                    </label>
                    <input
                        type="number"
                        value={price}
                        min="0"
                        onChange={e => setPrice(e.target.value)}
                        required
                        className='create-spot-form-input'
                    />
                </div>
                <div className='create-form-line'>
                    <label>
                        Preview Image url:
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        required
                        className='create-spot-form-input'
                    />
                </div>
                <div className='create-form-line'>
                    <label>
                        Description:
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className='create-spot-form-textarea'
                    />
                </div>
                <div className='create-spot-form-button-container'>
                    <button type="submit" className='create-spot-form-button'>Create new Spot</button>
                </div>
            </form>
        </section>
    );
}

export default CreateSpotForm;

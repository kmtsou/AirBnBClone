import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateSpot } from '../../store/spotReducer';

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
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        // console.log(typeof lat)
        // let floatLat = parseFloat(lat);
        // console.log(typeof floatLat)
        // let floatLng = parseFloat(lng);
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

        let createdSpot = await dispatch(thunkCreateSpot(payload)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit} >
                <label>
                    Spot name:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
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
                <button type="submit">Create new Spot</button>
            </form>
        </section>
    );
}

export default CreateSpotForm;

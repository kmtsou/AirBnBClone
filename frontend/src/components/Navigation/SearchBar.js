import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetSpots } from "../../store/spotReducer";
import './SearchBar.css'


const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => state.spots)
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    let spotsArray = Object.values(spots);

    const filterResults = (string) => {
        let results = []
        spotsArray.forEach(spot => {
            if (spot.city.toLowerCase().includes(string.toLowerCase()) || spot.country.toLowerCase().includes(string.toLowerCase()) || spot.state.toLowerCase().includes(string.toLowerCase())) {
                results.push(spot)
            }
        })
        return results;
    }

    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

    useEffect(() => {
        if (search.length > 0) {
            setSearchResults(filterResults(search))
        } else {
            setSearchResults([])
        }
    }, [search])

    const submitSearch = (e) => {
        e.preventDefault();
        if (searchResults.length > 0) {
            history.push(`/spots/${searchResults[0].spot || searchResults[0].id}`)
            setSearch('')
        } else {
            return;
        }
    }

    return (
        <>
            <form className='search-form'>
                <div className='search-div'>
                    <input className='search-input'
                        name='searchbar'
                        placeholder='Find a home by city|state|country'
                        type='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoComplete='off'
                    ></input>
                    <button className='search-button' onClick={submitSearch}><i className='fas fa-search'></i></button>
                </div>
            </form>
            {search && searchResults && searchResults.length > 0 && (
                <ul className='search-results-container'>
                    {searchResults.map((result, idx) => (
                        <li className='search-results-line' key={idx}>
                            <NavLink to={`/spots/${result.spot || result.id}`} className='result-link' onClick={() => setSearch('')}><p className='result-p'>{`${result.city}, ${result.state}, ${result.country}`}</p></NavLink>
                        </li>
                    ))}
                </ul>
            )}
            {search && searchResults.length === 0 && search.length > 0 && (
                <ul className='search-results-container'>
                    <li className='search-results-line-none'>No results found</li>
                </ul>
            )}
        </>
    )
}

export default SearchBar;

import { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

/**
 * SearchBar component for entering city names
 * @param {Function} onSearch - Callback function when search is submitted
 */
const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
};

export default SearchBar;

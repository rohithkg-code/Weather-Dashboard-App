import { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { getCurrentWeather, getForecast } from './services/weatherService';
import { Cloud } from 'lucide-react';
import './App.css';

/**
 * Main App component for Weather Dashboard
 */
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles search for a city's weather
   * @param {string} city - City name to search
   */
  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch both current weather and forecast in parallel
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="app-header">
          <Cloud className="app-logo" size={40} />
          <h1 className="app-title">Weather Dashboard</h1>
        </header>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        {/* Weather Data */}
        {!loading && !error && currentWeather && (
          <>
            <CurrentWeather data={currentWeather} />
            <Forecast data={forecast} />
          </>
        )}

        {/* Initial State */}
        {!loading && !error && !currentWeather && (
          <div className="welcome">
            <Cloud size={80} className="welcome-icon" />
            <h2>Welcome to Weather Dashboard</h2>
            <p>Search for a city to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

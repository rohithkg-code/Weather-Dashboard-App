import { Droplets, Wind, Eye, Thermometer } from 'lucide-react';
import { getWeatherIconUrl } from '../services/weatherService';
import './CurrentWeather.css';

/**
 * CurrentWeather component displays current weather conditions
 * @param {Object} data - Current weather data from API
 */
const CurrentWeather = ({ data }) => {
    if (!data) return null;

    // Format date and time
    const currentDate = new Date();
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit'
    };

    return (
        <div className="current-weather">
            <div className="weather-header">
                <div className="location-info">
                    <h2 className="city-name">
                        {data.name}, {data.sys.country}
                    </h2>
                    <p className="date-time">
                        {currentDate.toLocaleDateString('en-US', dateOptions)}
                    </p>
                    <p className="time">
                        {currentDate.toLocaleTimeString('en-US', timeOptions)}
                    </p>
                </div>
            </div>

            <div className="weather-main">
                <div className="temperature-section">
                    <img
                        src={getWeatherIconUrl(data.weather[0].icon)}
                        alt={data.weather[0].description}
                        className="weather-icon-large"
                    />
                    <div className="temperature-info">
                        <h1 className="temperature">{Math.round(data.main.temp)}°C</h1>
                        <p className="weather-condition">{data.weather[0].main}</p>
                        <p className="weather-description">{data.weather[0].description}</p>
                    </div>
                </div>

                <div className="weather-details">
                    <div className="detail-card">
                        <Thermometer className="detail-icon" size={24} />
                        <div className="detail-info">
                            <p className="detail-label">Feels Like</p>
                            <p className="detail-value">{Math.round(data.main.feels_like)}°C</p>
                        </div>
                    </div>

                    <div className="detail-card">
                        <Droplets className="detail-icon" size={24} />
                        <div className="detail-info">
                            <p className="detail-label">Humidity</p>
                            <p className="detail-value">{data.main.humidity}%</p>
                        </div>
                    </div>

                    <div className="detail-card">
                        <Wind className="detail-icon" size={24} />
                        <div className="detail-info">
                            <p className="detail-label">Wind Speed</p>
                            <p className="detail-value">{data.wind.speed} m/s</p>
                        </div>
                    </div>

                    <div className="detail-card">
                        <Eye className="detail-icon" size={24} />
                        <div className="detail-info">
                            <p className="detail-label">Visibility</p>
                            <p className="detail-value">{(data.visibility / 1000).toFixed(1)} km</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;

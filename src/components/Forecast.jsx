import { getWeatherIconUrl } from '../services/weatherService';
import './Forecast.css';

/**
 * Forecast component displays 5-day forecast
 * @param {Array} data - Array of forecast data
 */
const Forecast = ({ data }) => {
    if (!data || data.length === 0) return null;

    // Format date from timestamp
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="forecast">
            <h3 className="forecast-title">5-Day Forecast</h3>
            <div className="forecast-grid">
                {data.map((day, index) => (
                    <div key={index} className="forecast-card">
                        <p className="forecast-date">{formatDate(day.date)}</p>
                        <img
                            src={getWeatherIconUrl(day.icon)}
                            alt={day.description}
                            className="forecast-icon"
                        />
                        <p className="forecast-condition">{day.condition}</p>
                        <div className="forecast-temps">
                            <span className="temp-high">{day.tempMax}°</span>
                            <span className="temp-divider">/</span>
                            <span className="temp-low">{day.tempMin}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;

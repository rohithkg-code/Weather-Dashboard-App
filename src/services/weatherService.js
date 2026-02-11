// OpenWeatherMap API service
const API_KEY = '51b6df370ebe80d0acfb644201d8bc55';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather data for a given city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      throw new Error('Failed to fetch weather data. Please try again later.');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches 5-day weather forecast for a given city
 * @param {string} city - City name
 * @returns {Promise<Object>} Forecast data
 */
export const getForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      throw new Error('Failed to fetch forecast data. Please try again later.');
    }
    
    const data = await response.json();
    
    // Process forecast data to get daily highs/lows
    const dailyForecasts = {};
    
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date: item.dt,
          temps: [item.main.temp],
          condition: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        };
      } else {
        dailyForecasts[date].temps.push(item.main.temp);
      }
    });
    
    // Convert to array and calculate min/max temps
    const forecastArray = Object.values(dailyForecasts).map((day) => ({
      date: day.date,
      tempMin: Math.round(Math.min(...day.temps)),
      tempMax: Math.round(Math.max(...day.temps)),
      condition: day.condition,
      description: day.description,
      icon: day.icon,
    }));
    
    // Return first 5 days
    return forecastArray.slice(0, 5);
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the appropriate weather icon URL from OpenWeatherMap
 * @param {string} iconCode - Icon code from API
 * @returns {string} Icon URL
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

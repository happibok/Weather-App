import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        if (response.status === 404) {
            throw new Error('City not found. Please check the spelling.');
        }
        throw new Error('Could not fetch weather data. Status: ' + response.status);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {weatherData && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;

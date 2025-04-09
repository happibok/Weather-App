import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';
import UnitToggle from './components/UnitToggle';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [units, setUnits] = useState('metric'); // 'metric' or 'imperial'

  const fetchWeatherData = useCallback(async (city) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=${units}`);
      if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`City "${city}" not found. Please check the spelling.`);
        }
        throw new Error('Could not fetch weather data. Status: ' + response.status);
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [units]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setCurrentCity(city);
    await fetchWeatherData(city);
  };

  const handleUnitToggle = () => {
    setUnits(prevUnits => prevUnits === 'metric' ? 'imperial' : 'metric');
  };

  useEffect(() => {
    if (currentCity) {
      console.log(`Units changed to ${units}, refetching for ${currentCity}`);
      setLoading(true);
      fetchWeatherData(currentCity);
    }
  }, [units, currentCity, fetchWeatherData]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Weather Dashboard</h1>
      <UnitToggle units={units} onToggle={handleUnitToggle} />
      <SearchBar onSearch={handleSearch} />

      <div className="w-full max-w-md mt-8 min-h-[320px] flex flex-col justify-center items-center">
        {loading && !weatherData && (
          <p className="text-lg text-gray-600">Loading...</p>
        )}
        {!loading && error && (
          <ErrorMessage message={error} />
        )}
        {weatherData && (
          <WeatherCard weatherData={weatherData} units={units} />
        )}
      </div>

    </div>
  );
}

export default App;

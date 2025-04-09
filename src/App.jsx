import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState(null); // State to store the current city

  // Refactored function to fetch weather data
  const fetchWeatherData = useCallback(async (city) => {
    // Don't show loading indicator for background refresh
    // setLoading(true); // Optionally enable if you want loading indicator on refresh too
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        // Don't clear weather data on refresh error, just show error
        if (response.status === 404) {
          throw new Error(`City "${city}" not found. Please check the spelling.`);
        }
        throw new Error('Could not fetch weather data. Status: ' + response.status);
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null); // Clear error on successful fetch
    } catch (err) {
      setError(err.message);
      // Optionally clear weather data on error: setWeatherData(null);
    } finally {
      // setLoading(false); // Only set loading false if it was set true initially
    }
  }, []); // No dependencies needed for useCallback here as API_KEY/URL are constants

  // Function to handle the initial search
  const handleSearch = async (city) => {
    setLoading(true); // Show loading for initial search
    setError(null);
    setWeatherData(null); // Clear previous data on new search
    setCurrentCity(city); // Set the current city for refreshes
    await fetchWeatherData(city); // Fetch data for the new city
    setLoading(false); // Hide loading after initial search fetch completes
  };

  // Effect to set up interval for refreshing data
  useEffect(() => {
    if (!currentCity) {
      return; // Don't start interval if no city is set
    }

    // Fetch immediately when city changes (optional, handled by handleSearch)
    // fetchWeatherData(currentCity); 

    const intervalId = setInterval(() => {
      console.log(`Refreshing weather for ${currentCity}...`);
      fetchWeatherData(currentCity);
    }, REFRESH_INTERVAL);

    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
      console.log(`Cleared refresh interval for ${currentCity}`);
    };
  }, [currentCity, fetchWeatherData]); // Re-run effect if currentCity or fetchWeatherData changes

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {/* Show loading indicator only during initial search */}
      {loading && <p className="mt-4 text-lg text-gray-600">Loading...</p>}
      <ErrorMessage message={error} />
      {/* Show weather card if data exists, even if there's a refresh error */}
      {weatherData && !loading && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;

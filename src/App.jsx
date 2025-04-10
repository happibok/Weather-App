import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState(() => localStorage.getItem('weatherAppLastCity') || null);
  const [units, setUnits] = useState(() => localStorage.getItem('weatherAppUnits') || 'metric');

  const fetchWeatherData = useCallback(async (city) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=${units}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`City "${city}" not found. Please check the spelling.`);
        }
     
        throw new Error(JSON.stringify(data, null, 2));
      }
      
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [units]);

  const handleSearch = async (city) => {
    setLoading(true);
    setRefreshing(false);
    setError(null);
    setWeatherData(null);
    setCurrentCity(city);
    await fetchWeatherData(city);
  };

  const refreshWeather = async () => {
    if (!currentCity) return;
    
    console.log(`Refreshing weather for ${currentCity}...`);
    setRefreshing(true);
    await fetchWeatherData(currentCity);
  };

  useEffect(() => {
    if (currentCity) {
      localStorage.setItem('weatherAppLastCity', currentCity);
    }
  }, [currentCity]);

  useEffect(() => {
    if (currentCity && !weatherData && !loading && !error) {
      console.log(`Fetching initial data for stored city: ${currentCity}`);
      setLoading(true);
      fetchWeatherData(currentCity);
    }
  }, [currentCity, weatherData, loading, error, fetchWeatherData]);

  useEffect(() => {
    localStorage.setItem('weatherAppUnits', units);
    if (currentCity && weatherData) {
        console.log(`Units changed to ${units}, refetching for ${currentCity}`);
        setLoading(true);
        fetchWeatherData(currentCity);
    }
  }, [units]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 p-4 pt-8 sm:p-8 text-gray-100 font-sans relative overflow-hidden bg-cloud">
    
      <div className="cloud-shape-1"></div>
      <div className="cloud-shape-2"></div>
      

      <div className="relative z-10">
        <SearchBar onSearch={handleSearch} />
        
        <div className="w-full mt-4 flex flex-col items-center">
          {loading && !weatherData && (
            <div className="mt-16 loader" role="status" aria-label="Loading..."></div>
          )}
          {!loading && error && (
            <ErrorMessage message={error} />
          )}
          {weatherData && (
            <WeatherCard 
              weatherData={weatherData} 
              units={units} 
              refreshWeather={refreshWeather}
              refreshing={refreshing} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

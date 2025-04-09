import React from 'react';


function WeatherCard({ weatherData, units }) {
  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'm/s' : 'mph'; 

  const windSpeedDisplay = units === 'metric' 
    ? (wind.speed * 3.6).toFixed(1) + ' km/h' 
    : wind.speed.toFixed(1) + ' mph';

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 className="text-3xl font-semibold mb-4">{name}</h2>
      <div className="flex items-center justify-center mb-4">
        <img src={iconUrl} alt={weather[0].description} className="w-20 h-20" />
        <span className="text-5xl font-bold ml-4">{main.temp.toFixed(1)}{tempUnit}</span>
      </div>
      <p className="text-lg capitalize mb-4">{weather[0].description}</p>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="font-medium">Humidity</p>
          <p className="text-xl">{main.humidity}%</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="font-medium">Wind Speed</p>
          <p className="text-xl">{windSpeedDisplay}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard; 
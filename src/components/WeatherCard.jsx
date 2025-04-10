import React from 'react';
import { FiWind, FiDroplet, FiMapPin, FiArrowUp, FiArrowDown, FiSun } from 'react-icons/fi';

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = { month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).replace(/\s[AP]M$/, '');
  return `Today, ${formattedDate} ${formattedTime}`;
};

function WeatherCard({ weatherData, units }) {
  if (!weatherData) return null;

  const { name, main, weather, wind, dt, sys } = weatherData;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'km/h' : 'mph';

  const windSpeedDisplay = units === 'metric'
    ? (wind.speed * 3.6).toFixed(0) + ` ${speedUnit}`
    : wind.speed.toFixed(0) + ` ${speedUnit}`;

  const tempMax = Math.round(main.temp_max);
  const tempMin = Math.round(main.temp_min);

  return (
    <div className="w-full max-w-xl mx-auto">


      <div className="flex flex-col items-start mb-4">
        <div className="flex items-center">
          <FiMapPin className="text-white mr-2" size={24} />
          <h2 className="text-3xl font-bold text-white">{name}, {sys.country}</h2>
        </div>
        <p className="text-gray-300 text-sm mt-1">{formatDateTime(dt)}</p>
      </div>

      <div className="text-right mb-4">
        <p className="text-xl text-white capitalize">{weather[0].description}</p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="text-[10rem] font-thin text-white leading-none">
          {Math.round(main.temp)}<span className="text-5xl align-super">{tempUnit}</span>
        </div>
        <img src={iconUrl} alt={weather[0].description} className="w-48 h-48 filter drop-shadow-xl" />
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 bg-opacity-40 px-8 py-3 rounded-full flex items-center gap-6 backdrop-blur-sm">
          <div className="flex items-center">
            <FiArrowUp className="text-white mr-1" />
            <span className="text-white">{tempMax}°</span>
          </div>
          <div className="flex items-center">
            <FiArrowDown className="text-white mr-1" />
            <span className="text-white">{tempMin}°</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 bg-opacity-40 rounded-3xl p-6 grid grid-cols-3 gap-4 mt-8 info-panel">
    
        <div className="text-center border-r border-gray-700 pr-4">
          <FiDroplet className="mx-auto mb-2 text-white" size={24} />
          <p className="text-xl font-semibold text-white mb-1">23:00</p>
          <p className="text-sm text-gray-400">Slight chance<br />of rain</p>
        </div>
        
        <div className="text-center border-r border-gray-700 pr-4">
          <FiWind className="mx-auto mb-2 text-white" size={24} />
          <p className="text-xl font-semibold text-white mb-1">{windSpeedDisplay}</p>
          <p className="text-sm text-gray-400">Gentle breeze<br />now</p>
        </div>
        
        <div className="text-center">
          <FiSun className="mx-auto mb-2 text-white" size={24} />
          <p className="text-xl font-semibold text-white mb-1">UV{Math.min(Math.round(main.temp / 8), 12)}</p>
          <p className="text-sm text-gray-400">Low sunburn<br />risk today</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard; 
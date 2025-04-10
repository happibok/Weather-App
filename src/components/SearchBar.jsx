import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
      setShowInput(false);
    }
  };

  if (!showInput) {
    return (
      <div className="w-full flex justify-end mb-2">
        <button 
          onClick={() => setShowInput(true)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Search for location"
        >
          <FiSearch size={20} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mb-2">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for location..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 bg-opacity-50 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-200"
          autoFocus
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <button type="submit" className="hidden">Search</button>
        <button 
          type="button" 
          onClick={() => setShowInput(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
    </form>
  );
}

export default SearchBar; 
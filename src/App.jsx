import React from 'react';
import SearchBar from './components/SearchBar';

function App() {

  // Placeholder function for handling search
  const handleSearch = (city) => {
    console.log("Searching for city:", city);
    // API call logic will go here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {/* Weather display component will go here */}
    </div>
  );
}

export default App;

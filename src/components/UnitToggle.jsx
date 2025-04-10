import React from 'react';

function UnitToggle({ units, onToggle }) {
  return (
    <div className="my-4 flex items-center justify-center">
      <span className={`px-4 py-1 rounded-l-lg cursor-pointer transition-colors duration-200 ${units === 'metric' 
                                      ? 'bg-white text-blue-600 font-semibold shadow' 
                                      : 'bg-white bg-opacity-30 text-white hover:bg-opacity-50'}`}
            onClick={() => units !== 'metric' && onToggle()}
      >
        °C, km/h
      </span>
      <span className={`px-4 py-1 rounded-r-lg cursor-pointer transition-colors duration-200 ${units === 'imperial' 
                                      ? 'bg-white text-blue-600 font-semibold shadow' 
                                      : 'bg-white bg-opacity-30 text-white hover:bg-opacity-50'}`}
            onClick={() => units !== 'imperial' && onToggle()}
      >
        °F, mph
      </span>
    </div>
  );
}

export default UnitToggle; 
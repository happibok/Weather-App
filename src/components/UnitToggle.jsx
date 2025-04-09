import React from 'react';

function UnitToggle({ units, onToggle }) {
  return (
    <div className="my-4 flex items-center justify-center">
      <span className={`px-3 py-1 rounded-l-lg cursor-pointer ${units === 'metric' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => units !== 'metric' && onToggle()}
      >
        °C, km/h
      </span>
      <span className={`px-3 py-1 rounded-r-lg cursor-pointer ${units === 'imperial' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => units !== 'imperial' && onToggle()}
      >
        °F, mph
      </span>
    </div>
  );
}

export default UnitToggle; 
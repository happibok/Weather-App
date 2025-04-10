import React from 'react';

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="mt-8 p-4 bg-red-800 bg-opacity-80 border border-red-900 text-red-100 rounded-lg w-full max-w-md text-center shadow-lg backdrop-blur-sm" role="alert">
      <p className="font-semibold text-lg">Error</p>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage; 
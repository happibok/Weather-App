import React from 'react';

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg w-full max-w-md text-center" role="alert">
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage; 
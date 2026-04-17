import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-9xl font-extrabold text-blue-700">404</h1>
      <h2 className="text-3xl font-bold mt-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mt-2 mb-8 max-w-md mx-auto">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <NavLink 
        to="/" 
        className="px-8 py-3 bg-yellow-400 text-slate-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg"
      >
        Back to Home
      </NavLink>
    </div>
  );
};

export default NotFound;

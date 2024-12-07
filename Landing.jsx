// src/Landing.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleChoice = (isNewUser) => {
    if (isNewUser) {
      navigate('/signup');  // Redirect to Sign Up page
    } else {
      navigate('/login');  // Redirect to Login page
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Welcome to Our App!</h1>
      <p className="text-lg mb-4">Are you a new user or a returning user?</p>
      <div className="space-y-4">
        <button
          onClick={() => handleChoice(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          New User
        </button>
        <button
          onClick={() => handleChoice(false)}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Returning User
        </button>
      </div>
    </div>
  );
};

export default Landing;

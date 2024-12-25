import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-5xl font-extrabold mb-8">Welcome to LWMMS</h1>
      <div className="flex space-x-4">
        <Link to="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
          Signup
        </Link>
        <Link to="/login" className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
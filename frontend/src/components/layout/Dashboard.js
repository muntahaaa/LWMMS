import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#d5d1c5" }}
    >
      <h1 className="text-8xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>
      <div className="flex space-x-6">
        <Link
          to="/add-item"
          className="text-3xl px-8 py-4 text-white bg-gray-500 rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all duration-300"
        >
          Add Item
        </Link>
        <Link
          to="/view-items"
          className="text-3xl px-8 py-4 text-white bg-gray-500 rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-300"
        >
          View Items
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

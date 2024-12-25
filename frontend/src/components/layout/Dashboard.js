import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="flex space-x-4">
        <Link to="/add-item" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
          Add Item
        </Link>
        <Link to="/view-items" className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
          View Items
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
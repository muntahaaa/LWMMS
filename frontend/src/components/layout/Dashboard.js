import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import CreateItemForm from '../items/createItem';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const [showCreateItemForm, setShowCreateItemForm] = useState(false); 
    const { token } = useContext(AuthContext);
  
    const handleAddItemClick = () => {
      setShowCreateItemForm(true);
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleAddItemClick}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Add Item
          </button>
          <Link
            to="/view-items"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            View Items
          </Link>
        </div>
        {showCreateItemForm && <CreateItemForm token={token} />}
      </div>
    );
  };

export default Dashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const Signup = () => {
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    Password: '',
    roleName: 'User',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/signup', user);
      setMessage('Registration successful! Redirecting to login...');
      console.log(response.data);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: '#d5d1c5' }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-2xl w-96"
        style={{
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Create an Account</h2>
        <input
          type="text"
          name="Name"
          placeholder="Full Name"
          onChange={handleChange}
          className="mb-4 p-3 border rounded-md w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="email"
          name="Email"
          placeholder="Email Address"
          onChange={handleChange}
          className="mb-4 p-3 border rounded-md w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          onChange={handleChange}
          className="mb-4 p-3 border rounded-md w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
        >
          Sign Up
        </button>
        {message && (
          <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;

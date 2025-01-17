import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const Login = () => {
  const [credentials, setCredentials] = useState({
    Email: '',
    Password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('/auth/login', credentials);

   
      const { token } = response.data.data;

      if (token) {
      
        localStorage.setItem('token', token);

       
        setMessage('Login successful! Redirecting...');

       
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
       
        setMessage('Login failed. No token received.');
      }
    } catch (error) {
      
      setMessage(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          onChange={handleChange}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          onChange={handleChange}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 w-full"
        >
          Login
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Login;

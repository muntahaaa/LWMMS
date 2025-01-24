import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const Login = () => {
  const [credentials, setCredentials] = useState({
    Email: '',
    Password: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/auth/login', credentials);
      const { access_token } = response.data.data;
    localStorage.setItem("access_token", access_token); // Store token
      setMessage('Login successful!');
      console.log(response.data);
      setTimeout(() => navigate('/dashboard'), 1000); // Redirect to item-related page after 2 seconds
    } catch (error) {
      setMessage('Login failed. Please try again.');
      console.error(error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="email" name="Email" placeholder="Email" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
        <input type="password" name="Password" placeholder="Password" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded w-full ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const Signup = () => {
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    Password: '',
    roleName: 'User',
  });

  //const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState('');
  //const [roles, setRoles] = useState('Visitor');
  const navigate = useNavigate();

  /*useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/access/view-roles');
        
        setRoles(response.data); 
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);  */
 


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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input type="text" name="Name" placeholder="Name" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
        <input type="email" name="Email" placeholder="Email" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
        <input type="password" name="Password" placeholder="Password" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
       {/* <select name="roleName" onChange={handleChange} className="mb-2 p-2 border rounded w-full">
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.roleName}>
              {role.roleName}
            </option>
          ))}
        </select>  */}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full">Signup</button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import axios from 'axios';

const AddItemForm = ({ token }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    location: '',
    latitude: '',
    longitude: '',
    displayStatus: 'active',
    mediaAttachment: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, mediaAttachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await axios.post('http://localhost:3000/items/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="category" placeholder="Category" onChange={handleChange} />
      <input type="text" name="tags" placeholder="Tags" onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} />
      <input type="text" name="latitude" placeholder="Latitude" onChange={handleChange} />
      <input type="text" name="longitude" placeholder="Longitude" onChange={handleChange} />
      <input type="file" name="mediaAttachment" onChange={handleFileChange} />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
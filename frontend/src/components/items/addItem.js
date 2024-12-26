import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const AddItemForm = ({ token }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: '',
    tags: '',
    location: '',
    latitude: '',
    longitude: '',
    displayStatus: 'displayed',
    mediaAttachment: []
  });

  const [contributorData, setContributorData] = useState({
    contributorName: '',
    phone: '',
    email:'',
    description:''
  });

  const [existingContributors, setExistingContributors] = useState([]);
  const [isExistingContributor, setIsExistingContributor] = useState(true);
  const [selectedContributorID, setSelectedContributorID] = useState('');
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();


   
    useEffect(() => {
      // Fetch all contributors from the backend
      const fetchContributors = async () => {
        try {
          const response = await axios.get('/contributor/all', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setExistingContributors(response.data.data.contributors);
        } catch (error) {
          console.error('Failed to fetch contributors', error);
        }
      };
  
      fetchContributors();
    }, [token]);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleContributorChange = (e) => {
      setContributorData({ ...contributorData, [e.target.name]: e.target.value });
    };
  
    const handleFileChange = (e) => {
      setFormData({ ...formData, mediaAttachment: Array.from(e.target.files) });
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
    
      if (isExistingContributor) {
        data.append('contributorID', selectedContributorID);
      } else {
        const contributorResponse = await axios.post('/contributor/add', contributorData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const newContributorID = contributorResponse.data.data.contributor.id;
        data.append('contributorID', newContributorID);
      }
    
      data.append('itemDetails', JSON.stringify({
        title: formData.title,
        description: formData.description,
        category: formData.category.split(',').map(cat => cat.trim()),
        tags: formData.tags.split(',').map(tag => tag.trim()),
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        displayStatus: formData.displayStatus
      }));
    
      if (formData.mediaAttachments) {
        formData.mediaAttachments.forEach((file, index) => {
          data.append('mediaAttachment', file); // Ensure the field name matches
        });
      }
    
      try {
        const response = await axios.post('/items/add', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
        setMessage('Item created successfully!');
        console.log('Item created successfully:', response.data);
      } catch (error) {
        setMessage('Failed to create item. Please try again.');
        console.error('Failed to create item:', error);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4">Add Item</h2>
          <input type="text" name="title" placeholder="Title" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
          <textarea name="description" placeholder="Description" onChange={handleChange} className="mb-2 p-2 border rounded w-full"></textarea>
          <input type="text" name="category" placeholder="Category (comma-separated)" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
          <input type="text" name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
          <input type="text" name="latitude" placeholder="Latitude" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
          <input type="text" name="longitude" placeholder="Longitude" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
          <select name="displayStatus" onChange={handleChange} className="mb-2 p-2 border rounded w-full">
            <option value="displayed">Displayed</option>
            <option value="archived">Archived</option>
          </select>
          <input type="file" name="mediaAttachment" multiple onChange={handleFileChange} className="mb-2 p-2 border rounded w-full" />
  
          <div className="mb-4">
            <label className="block mb-2">Contributor</label>
            <div className="flex items-center mb-2">
              <input type="radio" name="contributorType" value="existing" checked={isExistingContributor} onChange={() => setIsExistingContributor(true)} />
              <span className="ml-2">Existing Contributor</span>
            </div>
            <div className="flex items-center mb-2">
              <input type="radio" name="contributorType" value="new" checked={!isExistingContributor} onChange={() => setIsExistingContributor(false)} />
              <span className="ml-2">New Contributor</span>
            </div>
          </div>
  
          {isExistingContributor ? (
            <select name="contributorID" onChange={(e) => setSelectedContributorID(e.target.value)} className="mb-2 p-2 border rounded w-full">
              <option value="">Select Contributor</option>
              {existingContributors.map((contributor) => (
                <option key={contributor.id} value={contributor.id}>
                  {contributor.contributorName} - {contributor.phone}
                </option>
              ))}
            </select>
          ) : (
            <>
              <input type="text" name="contributorName" placeholder="Contributor Name" onChange={handleContributorChange} className="mb-2 p-2 border rounded w-full" />
              <input type="text" name="phone" placeholder="Phone" onChange={handleContributorChange} className="mb-2 p-2 border rounded w-full" />
              <input type="text" name="email" placeholder="Email" onChange={handleContributorChange} className="mb-2 p-2 border rounded w-full" />
              <input type="text" name="description" placeholder="Description" onChange={handleContributorChange} className="mb-2 p-2 border rounded w-full" />
            </>
          )}
  
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full">Add Item</button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    );
  };
  
  export default AddItemForm;
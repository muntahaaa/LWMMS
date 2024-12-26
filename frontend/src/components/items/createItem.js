import React, { useState, useEffect } from 'react';

import axios from '../../axiosConfig';

const CreateItemForm = () => {
  const [contributors, setContributors] = useState([]);
  const [isCreatingContributor, setIsCreatingContributor] = useState(false);
  const [contributorDetails, setContributorDetails] = useState({
    contributorName: '',
    phone: '',
    email: '',
    description: ''
  });
  const [itemDetails, setItemDetails] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    location: '',
    latitude: '',
    longitude: '',
    displayStatus: 'displayed'
  });
  const [mediaAttachment, setMediaAttachment] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await axios.get('/contributor/all');
        setContributors(response.data.data.contributors);
      } catch (error) {
        console.error('Failed to fetch contributors', error);
      }
    };

    fetchContributors();
  }, []);

  const handleFileChange = (e) => {
    setMediaAttachment(e.target.files[0]);
  };

  const handleContributorSelect = (contributorId) => {
    const selectedContributor = contributors.find(
      (contributor) => contributor.id === contributorId
    );

    if (selectedContributor) {
      setContributorDetails({
        contributorName: selectedContributor.contributorName,
        phone: selectedContributor.phone,
        email: selectedContributor.email,
        description: selectedContributor.description
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    if (isCreatingContributor) {
      const contributorResponse = await axios.post('/contributor/create', contributorDetails);
      const newContributorID = contributorResponse.data.id;
      data.append('contributorID', newContributorID);
    } else {
      data.append('contributorID', contributorDetails.id);
    }

    data.append('contributor', JSON.stringify(contributorDetails));
    data.append('itemDetails', JSON.stringify(itemDetails));
    data.append('id', itemDetails.id);

    if (mediaAttachment) {
      data.append('mediaAttachment', mediaAttachment);
    }

    try {
      const response = await axios.post('/items/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
        <h2 className="text-2xl font-bold mb-4">Create Item</h2>
        
        <label className="block mb-2">
          Contributor:
          <select
            value={contributorDetails.id || ''}
            onChange={(e) => handleContributorSelect(e.target.value)}
            className="mb-2 p-2 border rounded w-full"
          >
            <option value="">-- Select Existing Contributor --</option>
            {contributors.map((contributor) => (
              <option key={contributor.id} value={contributor.id}>
                {contributor.contributorName} - {contributor.phone}
              </option>
            ))}
          </select>
        </label>
        
        <button
          type="button"
          onClick={() => setIsCreatingContributor(true)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add New Contributor
        </button>

        {isCreatingContributor && (
          <>
            <label className="block mb-2">
              Contributor Name:
              <input
                type="text"
                value={contributorDetails.contributorName}
                onChange={(e) =>
                  setContributorDetails({ ...contributorDetails, contributorName: e.target.value })
                }
                className="mb-2 p-2 border rounded w-full"
              />
            </label>
            <label className="block mb-2">
              Phone:
              <input
                type="text"
                value={contributorDetails.phone}
                onChange={(e) =>
                  setContributorDetails({ ...contributorDetails, phone: e.target.value })
                }
                className="mb-2 p-2 border rounded w-full"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={contributorDetails.email}
                onChange={(e) =>
                  setContributorDetails({ ...contributorDetails, email: e.target.value })
                }
                className="mb-2 p-2 border rounded w-full"
              />
            </label>
            <label className="block mb-2">
              Description:
              <textarea
                value={contributorDetails.description}
                onChange={(e) =>
                  setContributorDetails({ ...contributorDetails, description: e.target.value })
                }
                className="mb-2 p-2 border rounded w-full"
              />
            </label>
          </>
        )}

        <label className="block mb-2">
          Title:
          <input
            type="text"
            value={itemDetails.title}
            onChange={(e) =>
              setItemDetails({ ...itemDetails, title: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            value={itemDetails.description}
            onChange={(e) =>
              setItemDetails({ ...itemDetails, description: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Category:
          <input
            type="text"
            value={itemDetails.category}
            onChange={(e) =>
              setItemDetails({ ...itemDetails, category: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Tags:
          <input
            type="text"
            value={itemDetails.tags}
            onChange={(e) =>
              setItemDetails({ ...itemDetails, tags: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Location:
          <input
            type="text"
            value={itemDetails.location}
            onChange={(e) =>
              setItemDetails({ ...itemDetails, location: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Latitude:
          <input
            type="text"
            value={itemDetails.latitude}
            onChange={(e) =>
              setItemDetails({ ...itemDetails, latitude: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Longitude:
          <input
            type="text"
            value={itemDetails.longitude}
            onChange={(e) =>
              setItemDetails({ ...itemDetails, longitude: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Display Status:
          <select
            value={itemDetails.displayStatus}
            onChange={(e) =>
              setItemDetails({ ...itemDetails, displayStatus: e.target.value })
            }
            className="mb-2 p-2 border rounded w-full"
          >
            <option value="displayed">Displayed</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label className="block mb-2">
          Media Attachment:
          <input type="file" onChange={handleFileChange} className="mb-2 p-2 border rounded w-full" />
        </label>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full">
          Create Item
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default CreateItemForm;

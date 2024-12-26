import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
const UpdateItem = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    contributorName: "",
    phone: "",
    email: "",
    description: "",
    title: "",
    itemDescription: "",
    location: "",
    latitude: "",
    longitude: "",
    categories: [],
    tags: [],
    mediaLocation: "",
  });
  const [mediaAttachment, setMediaAttachment] = useState(null);
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`/items/${id}`);
        const item = response.data.data;
        setFormData({
          contributorName: item.Contributor?.contributorName || "",
          phone: item.Contributor?.phone || "",
          email: item.Contributor?.email || "",
          description: item.Contributor?.description || "",
          title: item.title || "",
          itemDescription: item.description || "",
          location: item.location || "",
          latitude: item.latitude || "",
          longitude: item.longitude || "",
          categories: item.Categories?.map((category) => category.name) || [],
          tags: item.Tags?.map((tag) => tag.name) || [],
          mediaLocation: item.mediaLocation || "",
        });
      } catch (error) {
        console.error("Error fetching item data:", error);
        alert("Failed to load item data.");
      }
    };
    fetchItemData();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    setMediaAttachment(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("contributor[contributorName]", formData.contributorName);
    data.append("contributor[phone]", formData.phone);
    data.append("contributor[email]", formData.email);
    data.append("contributor[description]", formData.description);
    data.append("itemDetails[title]", formData.title);
    data.append("itemDetails[description]", formData.itemDescription);
    data.append("itemDetails[location]", formData.location);
    data.append("itemDetails[latitude]", formData.latitude);
    data.append("itemDetails[longitude]", formData.longitude);
    formData.categories.forEach((category) => data.append("categories[]", category));
    formData.tags.forEach((tag) => data.append("tags[]", tag));
    if (mediaAttachment) {
      data.append("mediaAttachment", mediaAttachment);
    }
    try {
      await axios.put(`/items/update/${id}`, data);
      alert("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Update Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contributor Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contributorName" className="text-sm font-medium text-gray-700">
              Contributor Name
            </label>
            <input
              type="text"
              id="contributorName"
              name="contributorName"
              value={formData.contributorName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Contributor Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Item Details */}
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Item Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="itemDescription" className="text-sm font-medium text-gray-700">
            Item Description
          </label>
          <textarea
            id="itemDescription"
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="latitude" className="text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Categories and Tags */}
        <div>
          <label htmlFor="categories" className="text-sm font-medium text-gray-700">
            Categories (comma separated)
          </label>
          <input
            type="text"
            id="categories"
            value={formData.categories.join(",")}
            onChange={(e) =>
              setFormData({
                ...formData,
                categories: e.target.value.split(","),
              })
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="tags" className="text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tags.join(",")}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(","),
              })
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {/* Media Attachment */}
        <div>
          <label htmlFor="mediaAttachment" className="text-sm font-medium text-gray-700">
            Attach Media (if new)
          </label>
          <input
            type="file"
            id="mediaAttachment"
            onChange={handleFileChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {formData.mediaLocation && !mediaAttachment && (
          <p className="text-sm text-gray-600 mt-2">
            Current media: <a href={formData.mediaLocation} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View current file</a>
          </p>
        )}
        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-full sm:w-auto"
          >
            Confirm Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default UpdateItem;
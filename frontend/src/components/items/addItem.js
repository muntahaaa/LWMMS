import React, { useState } from "react";
import axios from "../../axiosConfig";

const AddItem = () => {
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
  });

  const [mediaAttachment, setMediaAttachment] = useState(null);
  const [message, setMessage] = useState(""); // For displaying messages

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

    formData.categories.forEach((category) =>
      data.append("categories[]", category)
    );
    formData.tags.forEach((tag) => data.append("tags[]", tag));
    if (mediaAttachment) {
      data.append("mediaAttachment", mediaAttachment);
    }

    try {
      const response = await axios.post("/items/add", data);
      setMessage("Item added successfully!"); // Success message
      console.log("Item added successfully:", response.data);
    } catch (error) {
      setMessage("Error adding item."); // Error message
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Item</h2>
      {/* Display message */}
      {message && (
        <div
          className={`mb-6 text-center py-2 px-4 rounded ${
            message.includes("successfully")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Contributor Information */}
        <div>
          <label htmlFor="contributorName" className="block font-medium mb-2">
            Contributor Name
          </label>
          <input
            id="contributorName"
            type="text"
            name="contributorName"
            value={formData.contributorName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-medium mb-2">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium mb-2">
            Contributor Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Item Details */}
        <div>
          <label htmlFor="title" className="block font-medium mb-2">
            Item Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="itemDescription" className="block font-medium mb-2">
            Item Description
          </label>
          <textarea
            id="itemDescription"
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          ></textarea>
        </div>
        <div>
          <label htmlFor="location" className="block font-medium mb-2">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="latitude" className="block font-medium mb-2">
            Latitude
          </label>
          <input
            id="latitude"
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block font-medium mb-2">
            Longitude
          </label>
          <input
            id="longitude"
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Categories and Tags */}
        <div>
          <label htmlFor="categories" className="block font-medium mb-2">
            Categories (comma separated)
          </label>
          <input
            id="categories"
            type="text"
            onChange={(e) =>
              setFormData({
                ...formData,
                categories: e.target.value.split(","),
              })
            }
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block font-medium mb-2">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            type="text"
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(","),
              })
            }
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Media Attachment */}
        <div className="col-span-2">
          <label htmlFor="mediaAttachment" className="block font-medium mb-2">
            Media Attachment
          </label>
          <input
            id="mediaAttachment"
            type="file"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;

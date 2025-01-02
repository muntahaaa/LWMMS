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
    diplayStatus: "displayed",
  });

  const [mediaAttachment, setMediaAttachment] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value : value,
    });
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
    data.append("displayStatus", formData.displayStatus);

    formData.categories.forEach((category) =>
      data.append("categories[]", category)
    );
    formData.tags.forEach((tag) => data.append("tags[]", tag));
    if (mediaAttachment) {
      data.append("mediaAttachment", mediaAttachment);
    }

    try {
      const response = await axios.post("/items/add", data);
      setMessage("Item added successfully!"); 
      //console.log("Item added successfully:", response.data);
    } catch (error) {
      setMessage("Error adding item.");
      //console.error("Error adding item:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="contributorName" className="text-sm font-semibold mb-2">
              Contributor Name
            </label>
            <input
              type="text"
              id="contributorName"
              name="contributorName"
              placeholder="Contributor Name"
              value={formData.contributorName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-semibold mb-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-semibold mb-2">
              Contributor Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Contributor Description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-semibold mb-2">
              Item Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Item Title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="itemDescription" className="text-sm font-semibold mb-2">
              Item Description
            </label>
            <textarea
              id="itemDescription"
              name="itemDescription"
              placeholder="Item Description"
              value={formData.itemDescription}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="latitude" className="text-sm font-semibold mb-2">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="longitude" className="text-sm font-semibold mb-2">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="categories" className="text-sm font-semibold mb-2">
              Categories (comma separated)
            </label>
            <input
              type="text"
              id="categories"
              name="categories"
              value={formData.categories.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categories: e.target.value.split(","),
                })
              }
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="tags" className="text-sm font-semibold mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(",")}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(","),
              })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="col-span-2">
              <label className="block font-medium mb-2">Display Status</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="displayed"
                  name="displayStatus"
                  value="displayed"
                  checked={formData.displayStatus === "displayed"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="displayed" className="mr-4">Displayed</label>
                
                <input
                  type="radio"
                  id="archived"
                  name="displayStatus"
                  value="archived"
                  checked={formData.displayStatus === "archived"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="archived">Archived</label>
              </div>
            </div>
         

        <div className="flex flex-col">
          <label htmlFor="mediaAttachment" className="text-sm font-semibold mb-2">
            Attach Media
          </label>
          <input
            type="file"
            id="mediaAttachment"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full sm:w-auto mt-4"
          >
            Add Item
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AddItem;
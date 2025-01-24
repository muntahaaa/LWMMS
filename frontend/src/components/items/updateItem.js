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
    collectionNo: "",
    accessionNo: "",
    displayStatus: "displayed",
    categories: [],
    tags: [],
    mediaLocation: [],
  });
  const [existingMedia, setExistingMedia] = useState([]); // Store existing media paths
  const [mediaAttachment, setMediaAttachment] = useState([]); // Store new uploaded files
  // Fetch Item Data
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`/items/${id}`);
        const item = response.data.data;
        console.log("Parsed item data:", item);

        setFormData({
          contributorName: item.Contributor?.contributorName || "",
          phone: item.Contributor?.phone || "",
          email: item.Contributor?.email || "",
          description: item.Contributor?.description || "",
          title: item.title || "",
          itemDescription: item.description || "",
          collectionNo: item.collectionNo ||"",
          accessionNo: item.accessionNo || "",
          location: item.location || "",
          latitude: item.latitude || "",
          longitude: item.longitude || "",
          displayStatus: item.displayStatus || "displayed",
          categories: item.Categories?.map((category) => category.name) || [],
          tags: item.Tags?.map((tag) => tag.name) || [],
          mediaLocation: item.mediaLocation || [], // Set mediaLocation as an array of file paths
        });

        setExistingMedia(item.mediaLocation || []); // Set existing media paths
        console.log("Existing media set to:", item.mediaLocation || []);
      } catch (error) {
        console.error("Error fetching item data:", error);
        alert("Failed to load item data.");
      }
    };

    fetchItemData();
  }, [id]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Change
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setMediaAttachment((prevAttachments) => [
      ...prevAttachments,
      ...selectedFiles,
    ]);
  };

  // Remove Existing Media
  const removeExistingMedia = (indexToRemove) => {
    if (window.confirm("Are you sure you want to remove this media file?")) {
      setExistingMedia((prevMedia) =>
        prevMedia.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  // Remove New Media
  const removeNewMedia = (indexToRemove) => {
    setMediaAttachment((prevAttachments) =>
      prevAttachments.filter((_, index) => index !== indexToRemove)
    );
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Add contributor details
    data.append("contributor[contributorName]", formData.contributorName);
    data.append("contributor[phone]", formData.phone);
    data.append("contributor[email]", formData.email);
    data.append("contributor[description]", formData.description);

    // Add item details
    data.append("itemDetails[title]", formData.title);
    data.append("itemDetails[description]", formData.itemDescription);
    data.append("itemDetails[location]", formData.location);
    data.append("itemDetails[latitude]", formData.latitude ? parseFloat(formData.latitude) : null);
    data.append("itemDetails[longitude]", formData.longitude ? parseFloat(formData.longitude) : null);
    data.append("itemDetails[collectionNo]", formData.collectionNo);
    data.append("itemDetails[accessionNo]", formData.accessionNo ? parseFloat(formData.accessionNo) : null);
    data.append("itemDetails[displayStatus]", formData.displayStatus);

    // Add categories and tags
    formData.categories.forEach((category) =>
      data.append("categories[]", category)
    );
    formData.tags.forEach((tag) => data.append("tags[]", tag));

    // Add media files (new and existing)
    mediaAttachment.forEach((file) => data.append("newMedia[]", file));
    data.append("existingMedia", JSON.stringify(existingMedia));

    try {
      await axios.put(`/items/update/${id}`);
      alert("Item updated successfully!");
    } catch (error) {
      console.error(
        "Error updating item:",
        error.response?.data || error.message
      );
      alert(
        `Error updating item: ${error.response?.data.message || error.message}`
      );
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Update Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contributor Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contributorName"
              className="text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="collectionNo"
              className="text-sm font-medium text-gray-700"
            >
              Collection Number
            </label>
            <input
              type="number"
              id="collectionNo"
              name="collectionNo"
              value={formData.collectionNo || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="accessionNo"
              className="text-sm font-medium text-gray-700"
            >
              Accession Number
            </label>
            <input
              type="number"
              id="accessionNo"
              name="accessionNo"
              value={formData.accessionNo || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

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
          <label
            htmlFor="itemDescription"
            className="text-sm font-medium text-gray-700"
          >
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
            <label
              htmlFor="location"
              className="text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="latitude"
              className="text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="longitude"
              className="text-sm font-medium text-gray-700"
            >
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
            <label htmlFor="displayed" className="mr-4">
              Displayed
            </label>

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

        {/* Categories and Tags */}
        <div>
          <label
            htmlFor="categories"
            className="text-sm font-medium text-gray-700"
          >
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
        <div className="flex flex-col mt-4">
          <label className="text-sm font-semibold mb-2">Media Files</label>

          {/* Existing Media */}
          {existingMedia.length > 0 ? (
            <div className="mt-2">
              <h3 className="text-sm font-semibold mb-2">
                Existing Media Files
              </h3>
              <ul className="list-disc pl-4">
                {existingMedia.map((file, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View File
                    </a>
                    <button
                      type="button"
                      onClick={() => removeExistingMedia(index)}
                      className="text-red-500 ml-4"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No existing media files found.
            </p>
          )}

          {/* New Media Upload */}
          <div className="mt-4">
            <label htmlFor="mediaAttachments" className="text-sm font-semibold">
              Add New Media Files
            </label>
            <input
              type="file"
              id="mediaAttachments"
              multiple
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          {/* Display New Media */}
          {mediaAttachment.length > 0 && (
            <div className="mt-2">
              <h3 className="text-sm font-semibold mb-2">
                Selected New Media Files
              </h3>
              <ul className="list-disc pl-4">
                {mediaAttachment.map((file, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeNewMedia(index)}
                      className="text-red-500 ml-4"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {formData.mediaLocation && !mediaAttachment && (
          <p className="text-sm text-gray-600 mt-2">
            Current media:{" "}
            <a
              href={formData.mediaLocation}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View current file
            </a>
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

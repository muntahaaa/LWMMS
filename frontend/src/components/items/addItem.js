import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";

const AddItem = () => {
  const [formData, setFormData] = useState({
    contributorName: "",
    phone: "",
    email: "",
    description: "",
    title: "",
    collectionNo: "",
    accessionNo: "",
    itemDescription: "",
    location: "",
    latitude: "",
    longitude: "",
    categories: [],
    tags: [],
    displayStatus: "displayed",
  });

  const [mediaAttachment, setMediaAttachment] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  //const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const token = localStorage.getItem("token") || "";
  if (!token) {
    console.error("Token is missing. Redirecting to login.");
    window.location.href = "/login";
  }

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await axios.get("/contributor/all");
        setContributors(response.data.data.contributors || []);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value : value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to Array
    setMediaAttachment((prevFiles) => {
      const existingFileNames = prevFiles.map((file) => file.name); // Avoid duplicates
      const newFiles = selectedFiles.filter(
        (file) => !existingFileNames.includes(file.name)
      );
      return [...prevFiles, ...newFiles];
    });
  };

  const handleContributorSelect = (contributor) => {
    setFormData({
      ...formData,
      contributorName: contributor.contributorName,
      phone: contributor.phone,
      email: contributor.email,
      description: contributor.description,
    });
    setShowDropdown(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("contributor[contributorName]", formData.contributorName);
    data.append("contributor[phone]", formData.phone);
    data.append("contributor[email]", formData.email);
    data.append("contributor[description]", formData.description);
    data.append("itemDetails[title]", formData.title);
    data.append("itemDetails[collectionNo]", formData.collectionNo);
    data.append("itemDetails[accessionNo]", formData.accessionNo);
    data.append("itemDetails[description]", formData.itemDescription);
    data.append("itemDetails[location]", formData.location);
    data.append("itemDetails[latitude]", formData.latitude);
    data.append("itemDetails[longitude]", formData.longitude);
    data.append("displayStatus", formData.displayStatus);

    formData.categories.forEach((category) =>
      data.append("categories[]", category)
    );
    formData.tags.forEach((tag) => data.append("tags[]", tag));
    if (Array.isArray(mediaAttachment) && mediaAttachment.length > 0) {
      mediaAttachment.forEach((file) => {
        data.append("mediaAttachments", file); // Append each file
      });
    } else {
      console.error("mediaAttachment is not an array:", mediaAttachment);
    }

    try {
      const response = await axios.post("/items/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Item added successfully:", response.data);
      alert("Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item");
    }
  };
  

  return (
    <div className="min-h-screen"
    style={{ backgroundColor: '#d5d1c5' }}
    >
    <div className="max-w-6xl mx-auto p-8  shadow-md rounded-lg">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
      Add Item
    </h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-left mb-4">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Contributor from Existing
        </button>
        {(showDropdown || searchQuery) && (
           <div className="mt-3 border border-gray-300 rounded-md p-2 bg-white">
      {/* Search Box */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {setSearchQuery(e.target.value);
          if (!showDropdown) setShowDropdown(true); 
        }}
        placeholder="Search contributor..."
        className="border border-gray-300 rounded-md p-2 w-full mb-2"
      />
      {/* Filtered Dropdown */}
            <select
              onChange={(e) => {
                const selectedContributor = contributors.find(
                  (contributor) =>
                    `${contributor.contributorName} - ${contributor.phone}` ===
                    e.target.value
                );
                handleContributorSelect(selectedContributor);
              }}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select Contributor</option>
              {contributors
          .filter((contributor) =>
            `${contributor.contributorName} - ${contributor.phone}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
          .map((contributor) => (
            <option
              key={contributor.id}
              value={`${contributor.contributorName} - ${contributor.phone}`}
            >
                  {contributor.contributorName} - {contributor.phone}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
    
      
   
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="contributorName"
              className="text-sm font-semibold mb-2"
            >
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
            <label htmlFor="collectionNo" className="text-sm font-semibold mb-2">
              Collection Number
            </label>
            <input
              type="text"
              id="collectionNo"
              name="collectionNo"
              placeholder="Item Collection Number"
              value={formData.collectionNo}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="accessionNo" className="text-sm font-semibold mb-2">
              Item Accession Number
            </label>
            <input
              type="text"
              id="accessionNo"
              name="accessionNo"
              placeholder="Item Accession Number"
              value={formData.accessionNo}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="itemDescription"
              className="text-sm font-semibold mb-2"
            >
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
              //checked={formData.displayStatus === "displayed"}
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
              //checked={formData.displayStatus === "archived"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="archived">Archived</label>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label
            htmlFor="mediaAttachments"
            className="text-sm font-semibold mb-2"
          >
            Attach Media (Multiple Files Allowed)
          </label>
          <input
            type="file"
            id="mediaAttachments"
            multiple // Enable multiple file uploads
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />

          {/* Display Selected Files */}
          {mediaAttachment.length > 0 && (
            <div className="mt-2">
              <h3 className="text-sm font-semibold mb-2">
                Selected Media Files
              </h3>
              <ul className="list-disc pl-4">
                {mediaAttachment.map((file, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setMediaAttachment((prevFiles) =>
                          prevFiles.filter((_, i) => i !== index)
                        )
                      }
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

        <div className="text-center">
        <button
          type="submit"
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
        >
          Add Item
        </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddItem;
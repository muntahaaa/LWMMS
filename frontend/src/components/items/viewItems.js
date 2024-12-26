import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";

const ViewItems = () => {
  const [items, setItems] = useState([]); // All items
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [searchType, setSearchType] = useState("get-all"); // Search type (dropdown)
  const [error, setError] = useState(null); // To handle and display errors

  // Fetch all items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch items based on the endpoint and query
  const fetchItems = async (endpoint = "get-all", query = "") => {
    try {
      let url = `/items/${endpoint}`;
      if (endpoint === "get-by-title") {
        url = `/items/${endpoint}?title=${query}`;
      }else if (endpoint === "get-by-contributorName") {
        url = `/items/${endpoint}?contributorName=${query}`;
      } else if (endpoint === "get-all-by-tag") {
        url = `/items/${endpoint}?tagName=${query}`;
      } else if (endpoint === "get-all-by-category") {
        url = `/items/${endpoint}?categoryName=${query}`;
      } else if (query) {
        url = `/items/${endpoint}?query=${query}`;
      }

      const response = await axios.get(url);
      setItems(response.data.data || []); // Fallback to empty array if data is null/undefined
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to fetch items. Please try again later.");
      setItems([]); // Clear items in case of an error
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchType === "get-all-by-tag") {
      fetchItems("get-all-by-tag", searchQuery);
    } else if (searchType === "get-all-by-category") {
      fetchItems("get-all-by-category", searchQuery);
    } else if (searchType === "by-contributor") {
      fetchItems("get-all-by-contributor", searchQuery);
    } else if (searchType === "get-by-title") {
      fetchItems("get-by-title", searchQuery);
    } else if (searchType === "get-by-contributorName") {
      fetchItems("get-by-contributorName", searchQuery);
    } else {
      fetchItems("get-all");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">View Items</h2>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-auto"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="get-all">All Items</option>
          <option value="get-all-by-category">By Category</option>
          <option value="get-all-by-tag">By Tag</option>
          <option value="get-by-contributorName">By Contributor</option>
          <option value="get-by-title">By Title</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Error Message  {item.Categories?.join(", ") || "None"}*/}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Items Display Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              className="bg-white shadow rounded-lg p-4 flex flex-col"
              key={item.id}
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-2">{item.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Location:</strong> {item.location || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Contributor:</strong>{" "}
                {item.Contributor?.contributorName || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Categories:</strong>{" "}
                
                {item.Categories?.map((tag) => tag.name).join(", ") || "None"}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Tags:</strong>{" "}
                {item.Tags?.map((tag) => tag.name).join(", ") || "None"}
              </p>
              {item.mediaLocation && (
                <img
                  src={`http://localhost:3000/${item.mediaLocation}`}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mt-2"
                />
              )}
              <div className="mt-4 flex justify-between">
                <Link to={`/update-item/${item.id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                    Update
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => {
                    if (
                      window.confirm("Are you sure you want to delete this item?")
                    ) {
                      axios
                        .delete(`/items/delete/${item.id}`)
                        .then(() => {
                          alert("Item deleted successfully!");
                          fetchItems(); // Refresh items after deletion
                        })
                        .catch((error) => {
                          console.error("Error deleting item:", error);
                          alert("Error deleting item.");
                        });
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 col-span-full text-center">
            No items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewItems;
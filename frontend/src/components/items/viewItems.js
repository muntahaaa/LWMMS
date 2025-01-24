import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";

const ViewItems = () => {
  const [items, setItems] = useState([]); // All items
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [searchType, setSearchType] = useState("get-all"); // Search type (dropdown)
  const [error, setError] = useState(null); // To handle and display errors
  const [mediaIndexes, setMediaIndexes] = useState({}); // Track currentMediaIndex for each item

  const token = localStorage.getItem("token") || "";
  if (!token) {
    console.error("Token is missing. Redirecting to login.");
    window.location.href = "/login";
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (endpoint = "get-all", query = "") => {
    try {
      let url = `/items/${endpoint}`;
      if (endpoint === "get-by-title") {
        url = `/items/${endpoint}?title=${query}`;
      } else if (endpoint === "get-by-contributorName") {
        url = `/items/${endpoint}?contributorName=${query}`;
      } else if (endpoint === "get-all-by-tag") {
        url = `/items/${endpoint}?tagName=${query}`;
      } else if (endpoint === "get-all-by-category") {
        url = `/items/${endpoint}?categoryName=${query}`;
      } else if (query) {
        url = `/items/${endpoint}?query=${query}`;
      }

        const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      setItems(response.data.data || []);
      setMediaIndexes({}); // Reset indexes when new items are fetched
      setError(null);
    } catch (error) {
      
      if (error.response && error.response.status === 403) {
        alert("You do not have permission to perform this action");
      } else {
        setError("Failed to fetch items. Please try again later.");
      }
      setItems([]);
    }
  };

  const handleMediaNavigation = (itemId, direction) => {
    setMediaIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[itemId] || 0;
      const newIndex =
        direction === "left" ? currentIndex - 1 : currentIndex + 1;
      return { ...prevIndexes, [itemId]: newIndex };
    });
  };

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
      <h2 className="text-2xl font-bold mb-4 text-center py-3 underline">View Items</h2>

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

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Items Display Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((item) => {
            const currentMediaIndex = mediaIndexes[item.id] || 0;

            return (
              <div
                className="bg-white shadow rounded-lg p-4 flex flex-col py-3"
                key={item.id}
              >
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Collection No:</strong> {item.collectionNo || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Accession No:</strong> {item.accessionNo || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Contributor/Donor:</strong>{" "}
                  {item.Contributor?.contributorName || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Object type/Category:</strong>{" "}
                  {item.Categories?.map((tag) => tag.name).join(", ") || "None"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Object head/Tags:</strong>{" "}
                  {item.Tags?.map((tag) => tag.name).join(", ") || "None"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Location:</strong> {item.location || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Display Status:</strong>{" "}
                  { item.displayStatus || "N/A"}
                </p>
                {item.mediaLocation && item.mediaLocation.length > 0 && (
                  <div className="relative w-full mb-4 flex justify-center items-center">
                    {/* Media Preview Section */}
                    <div className="flex justify-center items-center h-48">
                      <a
                        href={`http://localhost:3000/${item.mediaLocation[currentMediaIndex]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {item.mediaLocation[currentMediaIndex].endsWith(
                          ".docx"
                        ) ||
                        item.mediaLocation[currentMediaIndex].endsWith(
                          ".pdf"
                        ) ||
                        item.mediaLocation[currentMediaIndex].endsWith(
                            ".txt"
                          ) ||
                          item.mediaLocation[currentMediaIndex].endsWith(
                            ".doc"
                          ) ||
                        item.mediaLocation[currentMediaIndex].endsWith(
                          ".pptx"
                        ) ? (
                          <span className="text-blue-500 underline flex items-center justify-center h-full">
                            View File Document {currentMediaIndex + 1}
                          </span>
                        ) : (
                          <img
                            src={`http://localhost:3000/${item.mediaLocation[currentMediaIndex]}`}
                            alt={`Media ${currentMediaIndex + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        )}
                      </a>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
                      {/* Left Arrow */}
                      {currentMediaIndex > 0 && (
                        <button
                          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 pointer-events-auto flex items-center justify-center"
                          onClick={() => handleMediaNavigation(item.id, "left")}
                          style={{ position: "absolute", left: "10px" }}
                        >
                          &lt;
                        </button>
                      )}
                      {/* Right Arrow */}
                      {currentMediaIndex < item.mediaLocation.length - 1 && (
                        <button
                          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 pointer-events-auto flex items-center justify-center"
                          onClick={() =>
                            handleMediaNavigation(item.id, "right")
                          }
                          style={{ position: "absolute", right: "10px" }}
                        >
                          &gt;
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-auto flex justify-between">
                  <Link to={`/update-item/${item.id}`}>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this item?"
                        )
                      ) {
                        axios
                          .delete(`/items/delete/${item.id}`,{
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          })
                          .then(() => {
                            alert("Item deleted successfully!");
                            fetchItems(); // Refresh items after deletion
                          })
                          .catch((error) => {
                            if (error.response && error.response.status === 403) {
                              alert("You do not have permission to perform this action");
                            } else {
                              alert("Error deleting item.");
                            }
                          });
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
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
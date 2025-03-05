import React, { useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleDeleteEvent = async (productId) => {
    if (!productId) {
      toast.error("Invalid Artifact ID");
      return;
    }

    const deleteUrl = `${SummaryApi.deleteProduct.url.replace(':id', productId)}`;
    console.log("Delete request URL:", deleteUrl);

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        fetchdata(); // Refresh product list
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center border border-gray-200 transition-transform duration-200 hover:scale-105">
      {/* Increased Image Height */}
      <div className="w-full h-56 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={data?.productImage?.[0] || "/placeholder.jpg"} 
          alt={data?.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Info */}
      <div className="text-center w-full mt-3">
        <h1 className="text-lg font-semibold text-gray-800 truncate">Title: {data?.title}</h1>
        <p className="text-gray-600 text-sm">Category: {data?.category}</p>
      </div>

      {/* Description */}
      <div className="w-full mt-3 text-left">
        <p className="text-red-950 font-bold text-sm">Description:</p>
        <p className="text-gray-700 text-sm">{data?.description}</p>
      </div>

      {/* Contributor */}
      <div className="w-full mt-1 text-left">
        <p className="text-red-950 font-bold text-sm">Contributor:</p>
        <p className="text-gray-700 text-sm">{data?.contributorName}</p>
      </div>

      {/* Buttons */}
      <div className="w-full flex justify-between items-center mt-4">
        <button
          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          onClick={() => setEditProduct(true)}
        >
          <MdModeEditOutline size={20} />
        </button>
        <button
          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          onClick={() => handleDeleteEvent(data.id)}
        >
          <MdDelete size={20} />
        </button>
      </div>

      {/* Edit Modal */}
      {editProduct && <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />}
    </div>
  );
};

export default AdminProductCard;

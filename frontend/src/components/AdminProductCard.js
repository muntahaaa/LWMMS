import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center border border-gray-200 transition-transform duration-200 hover:scale-105">
      {/* Image Container */}
      <div className="w-40 h-40 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={data?.productImage[0] || "/placeholder.jpg"} // Fallback image if no image is found
          alt={data?.title}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Product Info */}
      <div className="text-center w-full mt-3">
        <h1 className="text-lg font-semibold text-gray-800 truncate">{data?.title}</h1>
        <p className="text-gray-600 text-sm">{data?.category}</p>
      </div>

      {/* Edit Button */}
      <div className="w-full flex justify-between items-center mt-4">
        <p className="text-red-600 font-bold text-lg">{data?.significance_level}</p>

        <button
          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          onClick={() => setEditProduct(true)}
        >
          <MdModeEditOutline size={20} />
        </button>
      </div>

      {/* Edit Modal */}
      {editProduct && <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />}
    </div>
  );
};

export default AdminProductCard;

import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import { Link } from "react-router-dom";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(8).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]); // Ensures correct category loads dynamically

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{heading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? loadingList.map((_, index) => (
              <div
                className="bg-white p-4 rounded-lg shadow-md animate-pulse"
                key={"loading-" + index}
              >
                <div className="bg-gray-200 h-40 w-full rounded-lg"></div>
                <div className="h-6 bg-gray-200 rounded-full mt-3 w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded-full mt-2 w-1/2"></div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={`/product/${product?.id}`}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all group"
                key={product?.id}
                onClick={scrollTop}
              >
                <div className="bg-gray-100 p-4 h-40 flex items-center justify-center rounded-lg">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.title}
                    className="h-full object-contain group-hover:scale-105 transition-all"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                    Title:{product?.title}
                  </h3>
                  <p className="text-sm text-gray-500">{product?.contributorName}</p>
                  <p className="text-sm text-gray-500">{product?.category}</p>
                  <p className="text-sm text-gray-500">Period: {product?.time_period}</p>
                  <p className="text-sm text-gray-500">Significance: {product?.significance_level}</p>
                  <p className="text-sm text-gray-500">Tags: {product?.tags?.join(", ")}</p>

                  <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 mt-3 rounded-lg transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchUserAddToCart();
                    }}
                  >
                    View Details
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;

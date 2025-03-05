import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(8).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-6 my-10">
      <h2 className="text-3xl font-serif font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
        {heading}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full bg-gray-100 rounded-lg shadow-lg animate-pulse"
              >
                <div className="bg-gray-300 h-56 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product?.id}
                to={"/product/" + product?.id}
                className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
              >
                {/* Image Section */}
                <div className="bg-gray-200 h-56 flex justify-center items-center p-3 rounded-t-lg">
                  <img
                    src={product?.productImage?.[0]}
                    className="object-contain h-full w-full mix-blend-multiply transition-transform duration-300 hover:scale-110"
                    alt={product?.title}
                  />
                </div>

                {/* Text Section */}
                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-serif font-semibold text-gray-900 truncate">
                    {product?.title}
                  </h2>
                  <p className="capitalize text-gray-600 text-sm">
                    {product?.category}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {product?.description}
                  </p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;

import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(10).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Explore Categories</h2>

      <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-2">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                className="h-20 w-20 md:w-24 md:h-24 rounded-full bg-gray-200 animate-pulse"
                key={"categoryLoading" + index}
              ></div>
            ))
          : categoryProduct.map((product, index) => (
              <Link
                to={`/product-category?category=${product?.category}`}
                className="group text-center transition-all"
                key={product?.category}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden p-4 bg-gray-100 flex items-center justify-center border hover:shadow-lg transition-all">
                  <img
                    src={product?.productImage[0] || "/placeholder.jpg"} // Fallback image if none exists
                    alt={product?.category}
                    className="h-full object-cover mix-blend-multiply group-hover:scale-110 transition-all"
                  />
                </div>
                <p className="text-sm md:text-base font-semibold text-gray-700 mt-2 capitalize group-hover:text-red-600">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;

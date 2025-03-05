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
    <div className="container mx-auto px-6 my-10">
      <h2 className="text-3xl font-serif font-semibold text-gray-800 text-center border-b-2 border-gray-300 pb-3">
        Explore Categories
      </h2>

      <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-4 justify-center">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-gray-200 animate-pulse"
                key={"categoryLoading" + index}
              ></div>
            ))
          : categoryProduct.map((product) => (
              <Link
                to={`/product-category?category=${product?.category}`}
                className="group text-center transition-all"
                key={product?.category}
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-300 shadow-md hover:shadow-xl transition-transform hover:scale-110">
                  <img
                    src={product?.productImage[0] || "/placeholder.jpg"}
                    alt={product?.category}
                    className="h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform"
                  />
                </div>
                <p className="text-sm md:text-lg font-semibold text-gray-700 mt-2 capitalize group-hover:text-red-700">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;

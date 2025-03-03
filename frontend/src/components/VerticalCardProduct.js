import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct"; // Make sure this fetches the product data
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]); // Default empty array to prevent undefined errors
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  // Fetch data for the category
  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []); // ✅ Ensure `data` is never undefined
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow animate-pulse"
              >
                <div className="bg-slate-200 h-48 p-4"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                  <p className="capitalize text-slate-500 bg-slate-200 animate-pulse p-1 rounded-full"></p>
                  <button className="text-sm bg-slate-200 animate-pulse p-2 rounded-full"></button>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product?.id}
                to={"/product/" + product?.id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-48 p-4">
                  <img
                    src={product?.productImage?.[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    alt={product?.title}
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-black">
                    {product?.title}
                  </h2>
                  <p className="capitalize text-slate-500">{product?.category}</p>
                  <div className="text-slate-500">{product?.description}</div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;

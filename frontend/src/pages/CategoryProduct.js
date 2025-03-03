import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();
    setLoading(false);
    setData([...dataResponse?.data] || []);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;

    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .filter((categoryKeyName) => selectCategory[categoryKeyName]);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) =>
      index === arrayOfCategory.length - 1 ? `category=${el}` : `category=${el}&&`
    );

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    let sortedData = [...data];

    if (value === "asc") {
      sortedData.sort((a, b) => a.significance_level - b.significance_level);
    }

    if (value === "dsc") {
      sortedData.sort((a, b) => b.significance_level - a.significance_level);
    }

    setData(sortedData);
  };

  return (
    <div className="container mx-auto p-4">
      {/*** Desktop version ***/}
      <div className="hidden lg:grid grid-cols-[250px,1fr] gap-6">
        {/*** Left Sidebar (Filters) ***/}
        <div className="bg-white p-4 shadow-md rounded min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/*** Sort by ***/}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">
              Sort by Significance
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value={"asc"}
                />
                <label>Less Significant to Most Significant</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value={"dsc"}
                />
                <label>Most Significant to Less Significant</label>
              </div>
            </form>
          </div>

          {/*** Filter by Category ***/}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">
              Artifact Categories
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3" key={index}>
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/*** Right Side (Artifacts Display) ***/}
        <div className="px-4">
          <p className="font-semibold text-gray-800 text-xl mb-3">
            Artifacts Found: {data.length}
          </p>

          <div className="min-h-[calc(100vh-120px)] overflow-y-auto max-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading ? (
              <VerticalCard data={data} loading={loading} />
            ) : (
              <p className="text-gray-500">No artifacts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;

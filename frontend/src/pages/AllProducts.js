import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allArtifacts, setAllArtifacts] = useState([]);

  const fetchAllArtifacts = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("artifact data", dataResponse);

    setAllArtifacts(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllArtifacts();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/*** Header ***/}
      <div className="bg-white py-3 px-6 flex justify-between items-center shadow-md rounded">
        <h2 className="font-bold text-xl text-gray-800">All Artifacts</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Artifact
        </button>
      </div>

      {/*** Artifact List ***/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 h-[calc(100vh-200px)] overflow-y-auto">
        {allArtifacts.map((artifact, index) => {
          return (
            <AdminProductCard
              data={artifact}
              key={index + "allArtifacts"}
              fetchdata={fetchAllArtifacts}
            />
          );
        })}
      </div>

      {/*** Upload Artifact Modal ***/}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllArtifacts}
        />
      )}
    </div>
  );
};

export default AllProducts;

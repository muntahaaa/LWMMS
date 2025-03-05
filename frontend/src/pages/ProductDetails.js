import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const ProductDetails = () => {
  const [data, setData] = useState({
    title: "",
    contributorName: "",
    category: "",
    productImage: [],
    description: "",
    time_period: "",
    significance_level: ""
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const productImageListLoading = new Array(4).fill(null);

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  const fetchArtifactDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId: params?.id })
    });
    setLoading(false);
    const dataResponse = await response.json();

    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchArtifactDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="min-h-[250px] flex flex-col lg:flex-row gap-6">
        {/*** Artifact Image Section ***/}
        <div className="h-auto flex flex-col lg:flex-row-reverse gap-6">
          <div className="h-[350px] w-[350px] lg:h-[400px] lg:w-[400px] bg-gray-200 rounded-lg shadow-md relative p-3">
            <img
              src={activeImage}
              className="h-full w-full object-contain mix-blend-multiply transition-all duration-200"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/** Zoomed Image Display ***/}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] bg-gray-200 p-2 rounded-lg shadow-md -right-[520px] top-0 overflow-hidden">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage}) no-repeat`,
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((_, index) => (
                  <div className="h-20 w-20 bg-gray-200 rounded animate-pulse" key={"loadingImage" + index}></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => (
                  <div className="h-20 w-20 bg-gray-200 rounded p-1 shadow-sm cursor-pointer" key={imgURL}>
                    <img
                      src={imgURL}
                      className="w-full h-full object-contain mix-blend-multiply transition-all duration-200 hover:scale-110"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/*** Artifact Details Section ***/}
        <div className="flex flex-col gap-2 w-full">
          {loading ? (
            <div className="grid gap-2">
              <p className="bg-gray-200 animate-pulse h-6 lg:h-8 w-full rounded-full"></p>
              <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-gray-200 animate-pulse w-full"></h2>
              <p className="capitalize text-gray-400 bg-gray-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>
              <div className="text-red-600 bg-gray-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full"></div>
              <p className="text-gray-600 font-medium my-2 h-6 lg:h-8 bg-gray-200 rounded animate-pulse w-full"></p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800">{data?.title}</h2>
              <p className="text-gray-600"><strong>Contributor:</strong> {data?.contributorName}</p>
              <p className="text-gray-600"><strong>Category:</strong> {data?.category}</p>
              <p className="text-gray-600"><strong>Time Period:</strong> {data?.time_period}</p>
              <p className="text-gray-600"><strong>Significance:</strong> {data?.significance_level}</p>

              <div>
                <p className="text-gray-700 font-medium">Description:</p>
                <p className="text-gray-600">{data?.description}</p>
              </div>
              {data?.latitude && data?.longitude && (
        <div className="mt-4">
          <p className="text-gray-700 font-medium">Location:</p>
          <MapContainer
            center={[data.latitude, data.longitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[data.latitude, data.longitude]}>
              <Popup>
                {data.title} is located here.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
            </div>
          )}
        </div>
      </div>

      {/*** Related Artifacts Display ***/}
      {data.category && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow">
          <CategoryWiseProductDisplay category={data?.category} heading={"Related Artifacts"} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

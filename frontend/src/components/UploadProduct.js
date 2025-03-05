import React, { useState, useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import uploadImage from "../helpers/uploadImage";
import productCategory from "../helpers/productCategory";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    title: "",
    contributorName: "",
    category: "",
    time_period: "",
    significance_level: "",
    tags: [],
    productImage: [],
    description: "",
    latitude: 23.8103, // Default: Dhaka, Bangladesh
    longitude: 90.4125,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const mapRef = useRef(null); // Reference for map

  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    const value = e.target.value.split(",").map((tag) => tag.trim());
    setData((prev) => ({ ...prev, tags: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data being sent to the API:", data);

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    } else {
      toast.error(responseData?.message);
    }
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setData((prev) => ({
          ...prev,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));
      },
    });

    return data.latitude && data.longitude ? (
      <Marker position={[data.latitude, data.longitude]} />
    ) : null;
  }

  useEffect(() => {
    if (mapRef.current) {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        showMarker: false,
        autoClose: true,
      });

      mapRef.current.addControl(searchControl);
      mapRef.current.on("geosearch/showlocation", (e) => {
        setData((prev) => ({
          ...prev,
          latitude: e.location.y,
          longitude: e.location.x,
        }));
      });
    }
  }, []);

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl h-full max-h-[90%] overflow-hidden shadow-lg">
        <div className="flex justify-between items-center pb-3 border-b">
          <h2 className="font-bold text-lg">Upload Artifact</h2>
          <div className="text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className="grid p-4 gap-4 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter artifact title"
            name="title"
            value={data.title}
            onChange={handleOnChange}
            className="p-2 bg-gray-100 border rounded"
            required
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="Enter artifact description"
            value={data.description}
            name="description"
            onChange={handleOnChange}
            className="p-2 bg-gray-100 border rounded"
            required
          />

          <label htmlFor="contributorName">Contributor Name:</label>
          <input
            type="text"
            id="contributorName"
            placeholder="Enter contributor's name"
            value={data.contributorName}
            name="contributorName"
            onChange={handleOnChange}
            className="p-2 bg-gray-100 border rounded"
            required
          />


          <label htmlFor="category">Category:</label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-gray-100 border rounded"
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="time_period">Time Period:</label>
          <input
            type="text"
            id="time_period"
            placeholder="Enter time period"
            name="time_period"
            value={data.time_period}
            onChange={handleOnChange}
            className="p-2 bg-gray-100 border rounded"
            required
          />
          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
              <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                          <span className='text-4xl'><FaCloudUploadAlt/></span>
                          <p className='text-sm'>Upload Product Image</p>
                          <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                        </div>
              </div>
              </label> 
              <div>
                  {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {
                              data.productImage.map((el,index)=>{
                                return(
                                  <div className='relative group'>
                                      <img 
                                        src={el} 
                                        alt={el} 
                                        width={80} 
                                        height={80}  
                                        className='bg-slate-100 border cursor-pointer'  
                                        onClick={()=>{
                                          setOpenFullScreenImage(true)
                                          setFullScreenImage(el)
                                        }}/>

                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                          <MdDelete/>  
                                        </div>
                                  </div>
                                  
                                )
                              })
                            }
                        </div>
                    ) : (
                      <p className='text-red-600 text-xs'>*Please upload product image</p>
                    )
                  }
                  
              </div>

          <label htmlFor="significance_level">Significance Level:</label>
          <input
            type="text"
            id="significance_level"
            placeholder="Enter significance level"
            name="significance_level"
            value={data.significance_level}
            onChange={handleOnChange}
            className="p-2 bg-gray-100 border rounded"
            required
          />

          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            placeholder="Enter tags"
            name="tags"
            value={data.tags.join(", ")}
            onChange={handleTagChange}
            className="p-2 bg-gray-100 border rounded"
          />

          <label>Pin Artifact Location on Map:</label>
          <MapContainer
            center={[data.latitude, data.longitude]}
            zoom={6}
            className="w-full h-64 border rounded"
            whenCreated={(map) => (mapRef.current = map)}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>

          <label>Latitude:</label>
          <input type="text" value={data.latitude} readOnly className="p-2 bg-gray-100 border rounded" />

          <label>Longitude:</label>
          <input type="text" value={data.longitude} readOnly className="p-2 bg-gray-100 border rounded" />

          <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded">Upload Artifact</button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;

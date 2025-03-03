import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

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
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });

  const [zoomImage, setZoomImage] = useState(false);

  const fetchArtifactDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
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
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/*** Artifact Image Section ***/}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' 
              onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

            {/** Zoomed Image Display ***/}
            {zoomImage && (
              <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}>
                </div>
              </div>
            )}
          </div>

          <div className='h-full'>
            {loading ? (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {productImageListLoading.map((_, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}></div>
                ))}
              </div>
            ) : (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {data?.productImage?.map((imgURL, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                    <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/*** Artifact Details Section ***/}
        {loading ? (
          <div className='grid gap-1 w-full'>
            <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
            <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></h2>
            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p>
            <div className='text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full'></div>
            <div className='w-full'>
              <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
              <p className='bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full'></p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-1'>
            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.title}</h2>
            <p className='text-slate-500'><strong>Contributor:</strong> {data?.contributorName}</p>
            <p className='capitalize text-slate-400'><strong>Category:</strong> {data?.category}</p>
            <p className='capitalize text-slate-400'><strong>Time Period:</strong> {data?.time_period}</p>
            <p className='capitalize text-slate-400'><strong>Significance:</strong> {data?.significance_level}</p>

            <div className='text-red-600 flex items-center gap-1'>
              <FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalf/>
            </div>

            <div>
              <p className='text-slate-600 font-medium my-1'>Description:</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {/*** Related Artifacts Display ***/}
      {data.category && (
        <CategoryWiseProductDisplay category={data?.category} heading={"Related Artifacts"} />
      )}
    </div>
  );
};

export default ProductDetails;

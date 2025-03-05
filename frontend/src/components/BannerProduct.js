import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner2/img0.jpg';
import image2 from '../assest/banner2/img1.jpg';
import image3 from '../assest/banner2/img2.avif';
import image4 from '../assest/banner2/img3.jpg';
import image5 from '../assest/banner2/img4.jpg';
import image6 from '../assest/banner2/img5.jpg';
import image7 from '../assest/banner2/img6.jpg';

import image1Mobile from '../assest/banner2/img1_mobile.jpg';
import image2Mobile from '../assest/banner2/img2_mobile.jpg';
import image3Mobile from '../assest/banner2/img3_mobile.jpg';
import image4Mobile from '../assest/banner2/img4_mobile.jpg';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [image1, image2, image3, image4, image5, image6, image7];
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile];

    const nextImage = () => {
        if (currentImage < desktopImages.length - 1) {
            setCurrentImage(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImage < desktopImages.length - 1) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='h-80 md:h-[500px] w-full bg-slate-200 relative overflow-hidden'>

                {/** Navigation Buttons (Only for Desktop & Tablet) */}
                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-3xl px-6'>
                        <button onClick={prevImage} className='bg-white shadow-lg rounded-full p-3 opacity-80 hover:opacity-100'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className='bg-white shadow-lg rounded-full p-3 opacity-80 hover:opacity-100'>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/** Desktop and Tablet Version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {desktopImages.map((imageURL, index) => (
                        <div
                            className='w-full h-full min-w-full min-h-full transition-transform duration-700 ease-in-out'
                            key={imageURL}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} className='w-full h-full object-cover' alt="Banner" />
                        </div>
                    ))}
                </div>

                {/** Mobile Version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {mobileImages.map((imageURL, index) => (
                        <div
                            className='w-full h-full min-w-full min-h-full transition-transform duration-700 ease-in-out'
                            key={imageURL}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} className='w-full h-full object-cover' alt="Banner" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;

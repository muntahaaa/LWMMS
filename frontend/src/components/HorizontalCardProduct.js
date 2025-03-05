import React, { useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(6).fill(null);

    const scrollElement = useRef();

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data || []);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className="container mx-auto px-6 my-10 relative">
            <h2 className="text-3xl font-serif font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">{heading}</h2>

            {/* Scrollable Section */}
            <div className="relative">
                <button 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white opacity-70 hover:opacity-100 p-3 rounded-full shadow-lg transition-all hidden md:block"
                    onClick={scrollLeft}
                >
                    <FaAngleLeft size={20} />
                </button>

                <div className="flex items-center gap-6 overflow-x-auto scrollbar-none transition-all py-4" ref={scrollElement}>
                    {loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className="w-[300px] h-[180px] bg-gray-200 rounded-lg shadow-lg animate-pulse"></div>
                        ))
                    ) : (
                        data.map((artifact, index) => (
                            <Link
                                to={`/product/${artifact?.id}`}
                                key={index}
                                className="w-[300px] h-[200px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105 overflow-hidden flex flex-col"
                            >
                                {/* Image Section */}
                                <div className="bg-gray-200 h-48 p-3 flex justify-center items-center">
                                    <img
                                        src={artifact?.productImage[0]}
                                        className="object-contain h-full w-full transition-transform duration-300 hover:scale-110"
                                        alt={artifact?.title}
                                    />
                                </div>

                                {/* Text Section */}
                                <div className="p-4 flex flex-col gap-1">
                                    <h2 className="font-serif text-lg font-semibold text-gray-900 truncate">{artifact?.title}</h2>
                                    <p className="capitalize text-gray-600 text-sm">{artifact?.category}</p>
                                    <p className="text-gray-700 text-sm">{artifact?.time_period}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                <button 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white opacity-70 hover:opacity-100 p-3 rounded-full shadow-lg transition-all hidden md:block"
                    onClick={scrollRight}
                >
                    <FaAngleRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default HorizontalCardProduct;

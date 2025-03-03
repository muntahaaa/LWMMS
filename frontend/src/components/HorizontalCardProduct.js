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
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-semibold py-4">{heading}</h2>

            <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all" ref={scrollElement}>
                <button className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block" onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                <button className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block" onClick={scrollRight}>
                    <FaAngleRight />
                </button>

                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-40 bg-white rounded-sm shadow flex">
                            <div className="bg-gray-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                            <div className="p-4 grid w-full gap-2">
                                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 bg-gray-200 animate-pulse p-1 rounded-full"></h2>
                                <p className="capitalize text-gray-500 bg-gray-200 animate-pulse p-1 rounded-full"></p>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((artifact, index) => (
                        <Link
                            to={`/product/${artifact?.id}`}
                            key={index}
                            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-40 bg-white rounded-sm shadow flex"
                        >
                            <div className="bg-gray-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                                <img
                                    src={artifact?.productImage[0]}
                                    className="object-scale-down h-full hover:scale-110 transition-all"
                                    alt={artifact?.title}
                                />
                            </div>
                            <div className="p-4 grid">
                                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">{artifact?.title}</h2>
                                <p className="capitalize text-gray-500">{artifact?.category}</p>
                                <p className="text-gray-600 text-sm">{artifact?.time_period}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default HorizontalCardProduct;

import React from 'react';
import scrollTop from '../helpers/scrollTop';
import { Link } from 'react-router-dom';

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(6).fill(null);

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
            {loading ? (
                loadingList.map((_, index) => (
                    <div key={index} className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow">
                        <div className="bg-gray-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
                        <div className="p-4 grid gap-3">
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
                        className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow"
                        onClick={scrollTop}
                    >
                        <div className="bg-gray-200 h-48 p-4 flex justify-center items-center">
                            <img
                                src={artifact?.productImage[0]}
                                className="object-scale-down h-full hover:scale-110 transition-all"
                                alt={artifact?.title}
                            />
                        </div>
                        <div className="p-4 grid gap-3">
                            <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{artifact?.title}</h2>
                            <p className="capitalize text-gray-500">{artifact?.category}</p>
                            <p className="text-gray-600 text-sm">{artifact?.time_period}</p>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default VerticalCard;

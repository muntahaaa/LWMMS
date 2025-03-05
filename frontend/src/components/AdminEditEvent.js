import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import uploadImage from '../helpers/uploadImage';
import SummaryApi from '../common';

const AdminEditEvent = ({ onClose, eventData, fetchData }) => {
    const [data, setData] = useState({
        ...eventData,
        eventName: eventData?.eventName || "",
        description: eventData?.description || "",
        eventDate: eventData?.eventDate || "",
        eventPlace: eventData?.eventPlace || "",
        registrationFee: eventData?.registrationFee || "",
        eventImage: eventData?.eventImage || []
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        
        setData((prevData) => ({
            ...prevData,
            [name]: name === "registrationFee" ? Number(value) : value
        }));
    };
    
    const handleUploadEventImage = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);

        setData((prev) => ({
            ...prev,
            eventImage: [...prev.eventImage, uploadImageCloudinary.url],
        }));
    };

    const handleDeleteEventImage = (index) => {
        const newEventImage = [...data.eventImage];
        newEventImage.splice(index, 1);

        setData((prev) => ({
            ...prev,
            eventImage: newEventImage,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...data,
            registrationFee: Number(data.registrationFee) // Convert to number
        };
        // Handle form submission
        try {
            const response = await fetch(SummaryApi.updateEvent.url, {
                method: SummaryApi.updateEvent.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formattedData)
            });
            
    
            const responseData = await response.json();
    
            if (responseData.success) {
                toast.success(responseData?.message);
                onClose();
                fetchData(); // Refresh data after update
            } else {
                toast.error(responseData?.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form.');
        }
    };

    return (
        <div className="fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-3xl h-full max-h-[90%] overflow-hidden shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className='font-bold text-lg'>Edit Event</h2>
                    <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <form className="grid p-4 gap-4 overflow-y-scroll h-full pb-10" onSubmit={handleSubmit}>
                    <label htmlFor="eventName">Event Name:</label>
                    <input
                        type="text"
                        id="eventName"
                        placeholder="Enter event name"
                        name="eventName"
                        value={data.eventName}
                        onChange={handleOnChange}
                        className="p-2 bg-gray-100 border rounded"
                        required
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        placeholder="Enter event description"
                        name="description"
                        value={data.description}
                        onChange={handleOnChange}
                        className="p-2 bg-gray-100 border rounded h-32"
                        required
                    />

                    <label htmlFor="eventDate">Event Date:</label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={data.eventDate}
                        onChange={handleOnChange}
                        className="p-2 bg-gray-100 border rounded"
                        //required
                    />

                    <label htmlFor="eventPlace">Event Place:</label>
                    <input
                        type="text"
                        id="eventPlace"
                        placeholder="Enter event place"
                        name="eventPlace"
                        value={data.eventPlace}
                        onChange={handleOnChange}
                        className="p-2 bg-gray-100 border rounded"
                        required
                    />

                    <label htmlFor="registrationFee">Registration Fee:</label>
                    <input
                        type="number"
                        id="registrationFee"
                        placeholder="Enter registration fee"
                        name="registrationFee"
                        value={data.registrationFee}
                        onChange={handleOnChange}
                        className="p-2 bg-gray-100 border rounded"
                        //required
                    />

                    <label htmlFor='eventImage' className='mt-3'>Event Image:</label>
                    <label htmlFor='uploadEventImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Event Image</p>
                                <input type='file' id='uploadEventImageInput' className='hidden' onChange={handleUploadEventImage} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.eventImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.eventImage.map((el, index) => {
                                            return (
                                                <div className='relative group' key={index}>
                                                    <img
                                                        src={el}
                                                        alt={`Event Image ${index + 1}`}
                                                        width={80}
                                                        height={80}
                                                        className='bg-slate-100 border cursor-pointer'
                                                    />
                                                    <div
                                                        className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                                                        onClick={() => handleDeleteEventImage(index)}
                                                    >
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please upload event image</p>
                            )
                        }
                    </div>

                    <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded mb-4">Update Event</button>
                </form>
            </div>
        </div>
    );
};

export default AdminEditEvent;
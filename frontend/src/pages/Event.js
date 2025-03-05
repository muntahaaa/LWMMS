import React, { useEffect, useState } from "react";
import UploadEvent from "../components/UploadEvent";
import { IoTicketSharp } from "react-icons/io5";
import { MdLocationOn, MdModeEditOutline, MdDelete } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { useNavigate } from "react-router-dom";

const AllEvents = () => {
    const [openUploadEvent, setOpenUploadEvent] = useState(false);
    const navigate = useNavigate();
    const [allEvent, setAllEvent] = useState([]);


    const FetchAllEvents = async () => {
        const response = await fetch(SummaryApi.allEvent.url);
        const dataResponse = await response.json();
        setAllEvent(dataResponse?.data || []);
    };

    useEffect(() => {
        FetchAllEvents();
    }, []);

    const handleBookEvent = (eventId, registrationFee) => {
        // Redirect to cart with eventId and registrationFee
        console.log(eventId,registrationFee)
        navigate(`/cart?eventId=${eventId}&registrationFee=${registrationFee}`);
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">


            {/*** Event List ***/}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 h-[calc(100vh-200px)] overflow-y-auto px-2">
                {allEvent.length === 0 ? (
                    <p>No events available</p>
                ) : (
                    allEvent.map((event, index) => {
                        console.log(event); // Log the event object to check its structure
                        return (
                            <div key={index} className="bg-white p-4 rounded shadow-md grid grid-rows-4 gap-4 relative">
                                {event?.eventImage && event.eventImage.length > 0 ? (
                                    <img src={event.eventImage[0]} alt={`Event ${index}`} className="row-span-3 w-full h-full object-cover rounded" />
                                ) : (
                                    <p className="row-span-3">No image available</p>
                                )}
                                <div className="row-span-1 flex flex-col justify-center">
                                    <h3 className="font-bold text-lg">{event.eventName}</h3>
                                    <h5 className="font-light text-lg">{event.description}</h5><br />
                                    <div className="flex items-center">
                                        <HiCalendarDateRange className="mr-2" />
                                        <p className="text-gray-600">{new Date(event.eventDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <MdLocationOn className="mr-2" />
                                        <p className="text-gray-600">{event.eventPlace}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <IoTicketSharp className="mr-2" />
                                        <p className="text-gray-600">{event.registrationFee} BDT</p>
                                    </div>
                                    <button
                                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2"
                                onClick={() => handleBookEvent(event.id, event.registrationFee)}
                            >
                                Book an Event
                            </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/*** Upload Event Modal ***/}
            {openUploadEvent && <UploadEvent onClose={() => setOpenUploadEvent(false)} />}


        </div>
    );
};

export default AllEvents;
import React, { useEffect, useState } from "react";
import UploadEvent from "../components/UploadEvent";
import AdminEditEvent from "../components/AdminEditEvent"; // Import the AdminEditEvent component
import { MdLocationOn, MdModeEditOutline, MdDelete } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const AllEvents = () => {
    const [openUploadEvent, setOpenUploadEvent] = useState(false);
    const [editEvent, setEditEvent] = useState(null); // State to manage the event being edited
    const [allEvent, setAllEvent] = useState([]);

    const FetchAllEvents = async () => {
        const response = await fetch(SummaryApi.allEvent.url);
        const dataResponse = await response.json();
        setAllEvent(dataResponse?.data || []);
    };

    useEffect(() => {
        FetchAllEvents();
    }, []);

    const handleDeleteEvent = async (eventId) => {
        if (!eventId) {
            toast.error("Invalid event ID");
            return;
        }
    
        const deleteUrl = `${SummaryApi.deleteEvent.url.replace(':id', eventId)}`;
        console.log("Delete request URL:", deleteUrl);
    
        try {
            const response = await fetch(deleteUrl, {
                method: "DELETE",  // Ensure method is correct
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            if (responseData.success) {
                toast.success(responseData.message);
                FetchAllEvents(); // Refresh event list
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error("An error occurred while deleting the event.");
        }
    };
    

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/*** Header ***/}
            <div className="bg-white py-3 px-6 flex justify-between items-center shadow-md rounded">
                <h2 className="font-bold text-xl text-gray-800">All Events</h2>
                <button
                    className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full"
                    onClick={() => setOpenUploadEvent(true)}
                >
                    Add Event
                </button>
            </div>

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
                                    <div className="flex items-center">
                                        <HiCalendarDateRange className="mr-2" />
                                        <p className="text-gray-600">{new Date(event.eventDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <MdLocationOn className="mr-2" />
                                        <p className="text-gray-600">{event.eventPlace}</p>
                                    </div>
                                    <button
                                        className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition absolute bottom-2 right-2"
                                        onClick={() => setEditEvent(event)}
                                    >
                                        <MdModeEditOutline size={20} />
                                    </button>
                                    <button
                                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition absolute bottom-2 left-2"
                                            onClick={() => handleDeleteEvent(event.id)}
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/*** Upload Event Modal ***/}
            {openUploadEvent && <UploadEvent onClose={() => setOpenUploadEvent(false)} />}

            {/*** Edit Event Modal ***/}
            {editEvent && (
                <AdminEditEvent
                    eventData={editEvent}
                    onClose={() => setEditEvent(null)}
                    fetchData={FetchAllEvents}
                />
            )}
        </div>
    );
};

export default AllEvents;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";

const MyEvents = () => {
    const [bookedEvents, setBookedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookedEvents = async () => {
            try {
                const cartResponse = await fetch(SummaryApi.addToCartProductView.url, {
                    method: SummaryApi.addToCartProductView.method,
                    credentials: "include",
                });

                const cartData = await cartResponse.json();
                if (!cartData.success || !cartData.data.length) {
                    setLoading(false);
                    return;
                }

                const eventDetails = cartData.data.map(item => item.event);

                setBookedEvents(eventDetails);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching booked events:", error);
                setLoading(false);
            }
        };

        fetchBookedEvents();
    }, []);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h2 className="font-bold text-xl text-gray-800">My Events</h2>
            <div className="bg-white p-4 rounded shadow-md">
                {loading ? (
                    <p>Loading events...</p>
                ) : bookedEvents.length === 0 ? (
                    <p>No events booked</p>
                ) : (
                    bookedEvents.map((event, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center mb-4 p-4 border rounded"
                            style={{
                                backgroundImage: `url(${event.eventImage})`, // Replaced imageUrl with eventImage
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                position: "relative",
                                padding: "20px", // Optional: padding to create space inside the box
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay to reduce the opacity of the background image
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 0, // Ensure overlay stays behind content
                                }}
                            />
                            <div style={{ zIndex: 1 }}>
                                <h3 className="font-bold text-white">{event.eventName}</h3>
                                <p className="text-gray-200">{event.description}</p>
                                <p className="text-gray-200">Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                                <p className="text-gray-200">Location: {event.eventPlace}</p>
                                <p className="text-gray-200 font-bold">Registration Fee: {event.registrationFee} BDT</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyEvents;

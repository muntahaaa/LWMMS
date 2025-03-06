import React, { useEffect, useState } from "react";
import SummaryApi from "../common";

const TicketInfo = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                // Fetch cart information from the backend API
                const response = await fetch(SummaryApi.logTicket.url, {
                    method: SummaryApi.logTicket.method,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                const data = await response.json();
               

                if (!data.success) {
                    throw new Error(data.message || "Failed to fetch ticket data");
                }

                setCartData(data.data || []);
            } catch (error) {
                console.error("Error fetching cart information:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, []);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h2 className="font-bold text-xl text-gray-800">Ticket Logs</h2>
            <div className="bg-white p-4 rounded shadow-md">
                {loading ? (
                    <p>Loading event information...</p>
                ) : cartData.length === 0 ? (
                    <p>No events booked</p>
                ) : (
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border">Ticket Type</th>
                                <th className="py-2 px-4 border">User Name</th>
                                <th className="py-2 px-4 border">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartData.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2 px-4 border">{item.ticketType || "Ticket not found"}</td>
                                    <td className="py-2 px-4 border">{item.userName || "User not found"}</td>
                                    <td className="py-2 px-4 border">{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};



export default TicketInfo

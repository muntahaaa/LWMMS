import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
   
    console.log('user id ', userId)
    
    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await fetch(SummaryApi.current_user.url, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const responseData = await response.json();
                if (responseData.success && responseData.data) {
                    setUserId(responseData.data.id); // user ID is stored in `data.data.id`
                    console.log("Fetched user ID:", responseData.data.id);
                } else {
                    toast.error("Failed to fetch user details.");
                }
            } catch (error) {
                toast.error("Error fetching user details: " + error.message);
            }
        };

        fetchUser();

        const queryParams = new URLSearchParams(location.search);
        const eventId = queryParams.get("eventId");
        const registrationFee = parseFloat(queryParams.get("registrationFee"));

        if (eventId && registrationFee) {
            const newCartItem = {
                eventId,
                registrationFee,
                quantity: 1, // Default quantity is 1
            };
            setCartItems([newCartItem]);
        }
    }, [location]);

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].quantity = newQuantity;
            return updatedItems;
        });
    };

    const handleConfirmPayment = async () => {
        if (!userId) {
            toast.error("You must Login to book an event.");
            return;
        }
        for (const item of cartItems) {
            await fetch(SummaryApi.addToCartProduct.url, {
                method: SummaryApi.addToCartProduct.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    eventId: item.eventId,
                    registrationFee: item.registrationFee * item.quantity,
                    paymentStatus: "paid",
                    quantity: item.quantity
                })
            })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        toast.success("Payment successful! Event booking confirmed.");
                    } else {
                        toast.error("Failed to book event " + response.message);
                    }
                })
                .catch(err => {
                    toast.error("API request failed: " + err);
                });
        }


        navigate("/my-events", { state: { cartItems } });
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h2 className="font-bold text-xl">Event booking confirmation</h2>
            <div className="bg-white p-4 rounded shadow-md">
                {cartItems.length === 0 ? (
                    <p>No events booked</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-4">
                            <div>
                                <p>Event ID: {item.eventId}</p>
                               
                                <p>Select the number of booking seat:</p>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                    className="border p-1 w-16"
                                />
                            </div>
                            <button
                                className="text-red-600 p-2 hover:bg-red-600 hover:text-white rounded-full"
                                onClick={() => setCartItems([])}
                            >
                                <MdDelete />
                            </button>
                        </div>
                    ))
                )}
                <button
                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition mt-4"
                    onClick={handleConfirmPayment}
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default Cart;

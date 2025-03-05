import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const userId = JSON.parse(sessionStorage.getItem('user'))?.userId || 1
     // Replace with actual user ID from authentication
console.log('user id ',userId)
    useEffect(() => {
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
                    toast.success("Payment successful! Event added to cart.");
                } else {
                    toast.error("Failed to add event to cart: " + response.message);
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
            <h2 className="font-bold text-xl">Cart</h2>
            <div className="bg-white p-4 rounded shadow-md">
                {cartItems.length === 0 ? (
                    <p>No items in the cart</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-4">
                            <div>
                                <p>Event ID: {item.eventId}</p>
                                <p>Registration Fee per Ticket: {item.registrationFee.toFixed(2)} BDT</p>
                                <p>Total: {(item.registrationFee * item.quantity).toFixed(2)} BDT</p>
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
                    Confirm Payment
                </button>
            </div>
        </div>
    );
};

export default Cart;

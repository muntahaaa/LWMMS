import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common"; // Import API helper
import { toast } from "react-toastify";
import { FaClock, FaTimes} from "react-icons/fa"; // Importing React Icons
import { FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';
import {  FaSun, FaMoon } from "react-icons/fa";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity of 1
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all tickets from backend API
    const fetchTickets = async () => {
      try {
        const response = await fetch(SummaryApi.getAllTickets.url, {
          method: SummaryApi.getAllTickets.method,
        });

        const data = await response.json();

        if (data.success) {
          setTickets(data.data); // Set tickets data
        } else {
          toast.error("Failed to fetch tickets");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        toast.error("Error fetching tickets");
      }
    };

    fetchTickets();
  }, []);

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1); // Reset quantity on new selection
    setSelectedDate(""); // Reset date on new selection
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handlePurchase = async () => {
    if (!selectedDate || quantity <= 0) {
      toast.error("Please select a valid date and quantity");
      return;
    }
  
    const purchaseData = {
      ticketId: selectedTicket.id,
      quantity,
      entryDate: selectedDate,
    };
  
    try {
      // Step 1: Create Payment Intent on backend
      const response = await fetch(SummaryApi.createPaymentIntent.url, {
        method: SummaryApi.createPaymentIntent.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });
  
      const data = await response.json();
  
      // If payment intent is created successfully
      if (data.success) {
        // Step 2: Redirect to Payment Details Page with the client secret and ticket info
        navigate(`/payment-details/${selectedTicket.id}`, {
          state: {
            clientSecret: data.clientSecret,
            selectedTicket: selectedTicket, // pass selected ticket
            quantity: quantity, // pass quantity
            totalPrice: selectedTicket.price*quantity, // pass total price calculated
            entryDate: selectedDate,
          },
        });
      } else {
        toast.error(data.message || "Failed to initiate payment process");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast.error("Error initiating payment process");
    }
  };
  
  
  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="
bg-green-950 py-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Museum Entry Tickets</h1>
          <p className="text-stone-300">Secure your visit to explore our nation's history</p>
        </div>
      </div>
  
      {/* Museum Timings */}
<div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
    <FaClock className="mr-2 text-green-800" /> Museum Opening Hours
  </h2>

  {/* Timings Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* March to September */}
    <div className="flex items-start bg-gray-50 p-4 rounded-lg">
      <FaSun className="text-2xl text-yellow-500 mr-4" />
      <div>
        <h3 className="text-lg font-semibold text-gray-700">March to September</h3>
        <p className="text-sm text-gray-600">10:00 AM - 6:00 PM</p>
      </div>
    </div>

    {/* October to February */}
    <div className="flex items-start bg-gray-50 p-4 rounded-lg">
      <FaMoon className="text-2xl text-indigo-500 mr-4" />
      <div>
        <h3 className="text-lg font-semibold text-gray-700">October to February</h3>
        <p className="text-sm text-gray-600">10:00 AM - 5:00 PM</p>
      </div>
    </div>

    {/* Ramadan Time */}
    <div className="flex items-start bg-gray-50 p-4 rounded-lg">
      <FaCalendarAlt className="text-2xl text-green-500 mr-4" />
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Ramadan Time</h3>
        <p className="text-sm text-gray-600">10:00 AM - 3:30 PM</p>
      </div>
    </div>

    {/* Weekend */}
    <div className="flex items-start bg-gray-50 p-4 rounded-lg">
      <FaClock className="text-2xl text-red-500 mr-4" />
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Weekend</h3>
        <p className="text-sm text-gray-600">Sunday</p>
      </div>
    </div>
  </div>

  {/* Additional Info */}
  <p className="text-sm text-gray-500 mt-6 text-center">
    *Please note that the museum may have special hours during holidays.
  </p>
</div>
  
      {/* Tickets List */}
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleTicketSelect(ticket)}
            >
              <div className="text-center relative">
                {/* Ticket Ribbon */}
                        <div className="absolute top-0 left-0 bg-green-800 text-white px-4 py-2 rounded-br-lg text-sm font-semibold flex items-center">
                           Ticket
                        </div>
                <FaTicketAlt className="text-4xl text-green-800 mx-auto" />
                <h2 className="text-xl font-semibold mt-4 text-gray-800">{ticket.type}</h2>
                <p className="text-lg font-bold text-orange-950 mt-2">Price(BDT)- {ticket.price}</p>
                <p className="text-sm text-gray-500 mt-1">Liberation War Museum</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No tickets available at the moment.</p>
        )}
      </div>
  
      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
            {/* Close Button (X) */}
            <button
              onClick={() => setSelectedTicket(null)} // Close the modal
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <FaTimes className="text-2xl" /> {/* Close icon */}
            </button>
  
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Ticket Details</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedTicket.type}</h3>
                  <p className="text-gray-600 mt-2">{selectedTicket.description}</p>
                </div>
  
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2" /> Select Entry Date:
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split("T")[0]}
                    max={new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split("T")[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
  
                {/* Quantity Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Quantity:</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={selectedTicket.quantity}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
  
                {/* Purchase Button */}
                <button
                  onClick={handlePurchase}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Purchase Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;

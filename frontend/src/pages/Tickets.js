import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common"; // Import API helper
import { toast } from "react-toastify";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4">Available Tickets</h1>

      {/* Tickets List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded-lg p-4 shadow-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleTicketSelect(ticket)}
            >
              <h2 className="text-lg font-semibold">{ticket.type}</h2>
              <p className="text-sm text-gray-600">{ticket.price}</p>
              <p className="text-sm text-gray-600">
                Available: {ticket.total_quantity}
              </p>
            </div>
          ))
        ) : (
          <p>No tickets available at the moment.</p>
        )}
      </div>

      {/* Ticket Details */}
      {selectedTicket && (
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-md">
            {" "}
            {/* Limit width for better full-screen appearance */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Ticket Details
            </h2>
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedTicket.type}
              </h3>
              <p className="text-gray-600 mb-6">{selectedTicket.description}</p>

              {/* Date Selection */}
              <div className="mb-6">
                <label
                  htmlFor="entryDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Entry Date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="entryDate"
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split("T")[0]} // Disable past dates
                    max={
                      new Date(new Date().setDate(new Date().getDate() + 5))
                        .toISOString()
                        .split("T")[0]
                    } // Disable dates more than 5 days after today
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none text-gray-900" // Custom styling for date input
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={selectedTicket.quantity}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Purchase Button */}
              <div className="mt-8 text-center">
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

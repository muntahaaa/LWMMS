import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const TicketDisplay = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [entryDate, setEntryDate] = useState("");

  // Fetch tickets from backend
  const fetchTickets = async () => {
    try {
      const response = await fetch(SummaryApi.getAllTickets.url, {
        method: SummaryApi.getAllTickets.method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setTickets(data.tickets);
      } else {
        toast.error("Failed to load tickets");
      }
    } catch (error) {
      toast.error("Error fetching tickets");
    }
    setIsLoading(false);
  };

  // Handle ticket selection
  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    setQuantity(1); // Reset quantity when new ticket is selected
    setEntryDate(""); // Reset entry date
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Handle date selection
  const handleDateChange = (e) => {
    setEntryDate(e.target.value);
  };

  // Validate date (must be within 5 days range)
  const validateDate = () => {
    const currentDate = new Date();
    const selectedDate = new Date(entryDate);
    const diffTime = selectedDate - currentDate;
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays >= 0 && diffDays <= 5;
  };

  // Handle purchase
  const handlePurchase = async () => {
    if (!selectedTicket) {
      toast.error("Please select a ticket");
      return;
    }

    if (!entryDate) {
      toast.error("Please select an entry date");
      return;
    }

    if (!validateDate()) {
      toast.error("You can only select an entry date within the next 5 days.");
      return;
    }

    try {
      const response = await fetch(SummaryApi.purchaseTicket.url, {
        method: SummaryApi.purchaseTicket.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          quantity,
          entryDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Ticket purchased successfully!");
        setSelectedTicket(null); // Reset selection after successful purchase
        setQuantity(1);
        setEntryDate("");
      } else {
        toast.error("Error purchasing ticket");
      }
    } catch (error) {
      toast.error("Error purchasing ticket");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Available Tickets</h1>

      {isLoading ? (
        <p>Loading tickets...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition duration-200"
              >
                <h3 className="text-xl font-semibold">{ticket.type}</h3>
                <p className="text-gray-600">Price: ₹{ticket.price}</p>
                <p className="text-gray-600">Available: {ticket.total_quantity}</p>
                <button
                  className="mt-3 text-blue-600 hover:text-blue-800"
                  onClick={() => handleTicketSelect(ticket)}
                >
                  Select Ticket
                </button>
              </div>
            ))
          ) : (
            <p>No tickets available</p>
          )}
        </div>
      )}

      {selectedTicket && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Purchase {selectedTicket.type}</h2>
          <div className="mt-4">
            <label className="block text-gray-700">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="p-2 mt-2 border rounded"
              min="1"
              max={selectedTicket.total_quantity}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Select Entry Date:</label>
            <input
              type="date"
              value={entryDate}
              onChange={handleDateChange}
              className="p-2 mt-2 border rounded"
              min={new Date().toISOString().split("T")[0]} // Today's date as minimum
              max={new Date(
                new Date().setDate(new Date().getDate() + 5)
              ).toISOString().split("T")[0]} // Maximum 5 days later
            />
            <div className="flex items-center gap-2 mt-2">
              <FaCalendarAlt className="text-gray-500" />
              <span className="text-sm text-gray-500">
                Entry date must be within the next 5 days.
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              onClick={handlePurchase}
            >
              Confirm Purchase
            </button>
            <button
              className="px-6 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded"
              onClick={() => setSelectedTicket(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDisplay;

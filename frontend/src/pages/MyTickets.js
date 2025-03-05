import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common"; // Import API helper
import { toast } from "react-toastify";
import {
  FaTicketAlt,
  FaCalendarDay,
  FaShoppingCart,
  FaInfoCircle,
} from "react-icons/fa";
const MyTickets = () => {
  const [myTickets, setMyTickets] = useState([]);
  const navigate = useNavigate();

  // Fetch purchased tickets for the logged-in user
  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const response = await fetch(SummaryApi.viewPurchasedTickets.url, {
          method: SummaryApi.viewPurchasedTickets.method,
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setMyTickets(data.data); // Store the purchased tickets data
        } else {
          toast.error("Failed to fetch purchased tickets");
        }
      } catch (error) {
        console.error("Error fetching purchased tickets:", error);
        toast.error("Error fetching purchased tickets");
      }
    };

    fetchMyTickets();
  }, []); // Runs on component mount

  const handleTicketDetails = (ticketId) => {
    // Redirect to ticket details page for further info or to update the ticket
    navigate(`/ticket-details/${ticketId}`);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center my-6 text-gray-800">
        My Tickets
      </h1>

      {/* Display list of purchased tickets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myTickets.length > 0 ? (
          myTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
              onClick={() => handleTicketDetails(ticket.id)}
            >
              {/* Ticket Ribbon */}
              <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-1 rounded-br-lg text-sm font-semibold">
                <FaTicketAlt className="inline-block mr-2" /> {ticket.type}
              </div>

              {/* Ticket Content */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center text-gray-700">
                  <FaCalendarDay className="text-xl mr-2 text-blue-600" />
                  <span className="font-semibold">Entry Date:</span>{" "}
                  {ticket.entry_date}
                </div>
                <div className="flex items-center text-gray-700">
                  <FaShoppingCart className="text-xl mr-2 text-blue-600" />
                  <span className="font-semibold">Purchase Date:</span>{" "}
                  {ticket.purchase_date}
                </div>
                <div className="flex items-center text-gray-700">
                  <FaInfoCircle className="text-xl mr-2 text-blue-600" />
                  <span className="font-semibold">Quantity:</span>{" "}
                  {ticket.quantity}
                </div>
              </div>

              {/* Ticket Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Show this ticket at the museum entrance.
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-lg text-gray-600">
              You have not purchased any tickets yet.
            </p>
            <button
              onClick={() => navigate("/tickets")} // Redirect to tickets page
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
            >
              Browse Tickets
            </button>
          </div>
        )}
      </div>

      {/* Optional: Add a decorative museum-themed background or illustration */}
      <div className="mt-12 text-center">
        <img
          src="/images/bg1.jpg"
          alt="Museum Illustration"
          className="mx-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default MyTickets;
 
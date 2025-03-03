import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common"; // Import API helper
import { toast } from "react-toastify";

const MyTickets = () => {
  const [myTickets, setMyTickets] = useState([]);
  const navigate = useNavigate();

  // Fetch purchased tickets for the logged-in user
  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const response = await fetch(SummaryApi.viewPurchasedTickets.url, {
          method: SummaryApi.viewPurchasedTickets.method,
          credentials : 'include',
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4">My Tickets</h1>

      {/* Display list of purchased tickets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {myTickets.length > 0 ? (
          myTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleTicketDetails(ticket.id)}
            >
              <h2 className="text-lg font-semibold">{ticket.type}</h2>
              <p className="text-sm text-gray-600">{ticket.category}</p>
              <p className="text-sm text-gray-600">Quantity: {ticket.quantity}</p>
              <p className="text-sm text-gray-600">Entry Date: {ticket.entry_date}</p>
              <p className="text-sm text-gray-600">
                Purchase Date: {ticket.purchase_date}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">You have not purchased any tickets yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyTickets;

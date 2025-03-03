import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SummaryApi from "../common"; // Import API helper
import { toast } from "react-toastify";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]); // State to hold all tickets
  const [loading, setLoading] = useState(true); // State for loading spinner

  useEffect(() => {
    // Fetch all tickets from the backend
    const fetchTickets = async () => {
      try {
        const response = await fetch(SummaryApi.getAllTickets.url, {
          method: SummaryApi.getAllTickets.method,
        });

        if (!response.ok) {
          // Check for non-OK responses
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setTickets(data.data); // Set tickets data
        } else {
          toast.error("Failed to fetch tickets");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        toast.error("Error fetching tickets");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchTickets();
  }, []); // Run on initial render

  const handleDeleteTicket = async (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        const response = await fetch(SummaryApi.deleteTicket.url, {
          method: SummaryApi.deleteTicket.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketId }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Ticket deleted successfully");
          setTickets(tickets.filter((ticket) => ticket.id !== ticketId)); // Remove the deleted ticket from the list
        } else {
          toast.error("Failed to delete ticket");
        }
      } catch (error) {
        console.error("Error deleting ticket:", error);
        toast.error("Error deleting ticket");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4">All Tickets</h1>

      {/* Button to Add New Ticket */}
      <Link
        to="/admin-panel/add-ticket"
        className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 inline-block hover:bg-green-600"
      >
        Add Ticket
      </Link>

      {/* Display loading spinner if tickets are being fetched */}
      {loading && <div className="text-center">Loading...</div>}

      {/* Display tickets if available */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between"
            >
              <h2 className="text-lg font-semibold">{ticket.type}</h2>
              <p className="text-sm text-gray-500">Price: {ticket.price}</p>
              <p className="text-sm text-gray-500">
                Available: {ticket.total_quantity}
              </p>

              {/* Buttons for Update and Delete Ticket */}
              <div className="flex justify-between mt-4">
                <Link
                  to={`/admin-panel/edit-ticket/${ticket.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDeleteTicket(ticket.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No tickets available</p>
        )}
      </div>
    </div>
  );
};

export default AllTickets;

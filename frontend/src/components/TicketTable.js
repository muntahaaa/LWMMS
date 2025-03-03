import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all tickets from the API
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
        setTickets(data.tickets); // Update state with fetched tickets
      } else {
        toast.error("Failed to load tickets");
      }
    } catch (error) {
      toast.error("Error fetching tickets");
    }
    setIsLoading(false);
  };

  // Delete ticket
  const handleDelete = async (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        const response = await fetch(SummaryApi.deleteTicket.url, {
          method: SummaryApi.deleteTicket.method,
          body: JSON.stringify({ ticketId }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Ticket deleted successfully");
          fetchTickets(); // Refresh tickets after delete
        } else {
          toast.error("Failed to delete the ticket");
        }
      } catch (error) {
        toast.error("Error deleting the ticket");
      }
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Manage Tickets</h1>

      {isLoading ? (
        <p>Loading tickets...</p>
      ) : (
        <>
          <div className="mb-4 text-right">
            <Link
              to="/admin-panel/create-ticket"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create New Ticket
            </Link>
          </div>

          <table className="min-w-full table-auto bg-white border-collapse shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Total Quantity</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="py-2 px-4">{ticket.type}</td>
                    <td className="py-2 px-4">{`₹${ticket.price}`}</td>
                    <td className="py-2 px-4">{ticket.total_quantity}</td>
                    <td className="py-2 px-4">
                      <Link
                        to={`/admin-panel/update-ticket/${ticket.id}`}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No tickets available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TicketTable;

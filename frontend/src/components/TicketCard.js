import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const TicketCard = ({ ticket, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(SummaryApi.deleteTicket.url, {
        method: SummaryApi.deleteTicket.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId: ticket.id }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Ticket deleted successfully!");
        onDelete(ticket.id); // Remove ticket from the list after deletion
      } else {
        toast.error(data.message || "Failed to delete the ticket.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the ticket.");
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">{ticket.type}</h3>
        <p className="text-gray-600">Price: ₹{ticket.price}</p>
        <p className="text-gray-600">Available Quantity: {ticket.total_quantity}</p>
      </div>

      {/* Admin Options */}
      <div className="flex items-center gap-4">
        <Link
          to={`/admin-panel/update-ticket/${ticket.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaEdit className="text-xl" />
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrashAlt className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TicketCard;

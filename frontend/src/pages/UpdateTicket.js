import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UpdateTicket = () => {
  const { id } = useParams(); // Get ticket ID from the URL
  const [ticketData, setTicketData] = useState({
    type: "",
    price: "",
    total_quantity: "",
  });
  const navigate = useNavigate();

  // Fetch the ticket data for editing
  const fetchTicketData = async () => {
    try {
      const response = await fetch(SummaryApi.getAllTickets.url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId: id }),
      });

      const data = await response.json();
      if (data.success) {
        setTicketData({
          type: data.ticket.type,
          price: data.ticket.price,
          total_quantity: data.ticket.total_quantity,
        });
      } else {
        toast.error(data.message || "Failed to fetch ticket data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching ticket data");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTicketData();
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update ticket
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform basic validation before sending data
    if (!ticketData.type || !ticketData.price || !ticketData.total_quantity) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // Make API call to update the ticket
      const response = await fetch(SummaryApi.updateTicket.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...ticketData, ticketId: id }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Ticket updated successfully!");
        // Redirect to All Tickets page after successful update
        navigate("/admin-panel/all-tickets");
      } else {
        toast.error(data.message || "Failed to update ticket");
      }
    } catch (error) {
      toast.error("An error occurred while updating the ticket.");
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Ticket</h2>

      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Ticket Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={ticketData.type}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            placeholder="Enter ticket type (e.g., VIP, General)"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Ticket Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={ticketData.price}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            placeholder="Enter ticket price"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="total_quantity" className="block text-sm font-medium text-gray-700">
            Total Quantity Available
          </label>
          <input
            type="number"
            id="total_quantity"
            name="total_quantity"
            value={ticketData.total_quantity}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            placeholder="Enter total ticket quantity available"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Update Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTicket;

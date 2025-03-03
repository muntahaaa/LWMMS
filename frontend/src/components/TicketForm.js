import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const TicketForm = ({ isEdit = false }) => {
  const [ticketData, setTicketData] = useState({
    type: "",
    price: "",
    total_quantity: "",
  });

  const { id } = useParams(); // Extract ticket ID from URL for editing an existing ticket
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      // Fetch ticket details if in edit mode
      fetchTicketDetails(id);
    }
  }, [isEdit, id]);

  const fetchTicketDetails = async (ticketId) => {
    try {
      const response = await fetch(SummaryApi.getAllTickets.url, {
        method: SummaryApi.getAllTickets.method,
        body: JSON.stringify({ ticketId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setTicketData(data.ticket);
      } else {
        toast.error("Failed to fetch ticket details.");
      }
    } catch (error) {
      toast.error("Error fetching ticket details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketData.type || !ticketData.price || !ticketData.total_quantity) {
      return toast.error("Please fill all fields.");
    }

    const ticketPayload = {
      type: ticketData.type,
      price: parseFloat(ticketData.price),
      total_quantity: parseInt(ticketData.total_quantity, 10),
    };

    try {
      const response = isEdit
        ? await fetch(SummaryApi.updateTicket.url, {
            method: SummaryApi.updateTicket.method,
            body: JSON.stringify({ ticketId: id, ...ticketPayload }),
            headers: {
              "Content-Type": "application/json",
            },
          })
        : await fetch(SummaryApi.uploadTicket.url, {
            method: SummaryApi.uploadTicket.method,
            body: JSON.stringify(ticketPayload),
            headers: {
              "Content-Type": "application/json",
            },
          });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        navigate("/admin-panel/all-tickets");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error saving ticket.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Update Ticket" : "Create New Ticket"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-gray-600">
            Ticket Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={ticketData.type}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            placeholder="Enter ticket type"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-600">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={ticketData.price}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            placeholder="Enter ticket price"
            required
          />
        </div>

        <div>
          <label htmlFor="total_quantity" className="block text-gray-600">
            Total Quantity
          </label>
          <input
            type="number"
            id="total_quantity"
            name="total_quantity"
            value={ticketData.total_quantity}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            placeholder="Enter total quantity"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update Ticket" : "Create Ticket"}
        </button>
      </form>
    </div>
  );
};

export default TicketForm;

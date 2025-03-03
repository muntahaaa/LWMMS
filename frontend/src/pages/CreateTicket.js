import React, { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
  const [ticketData, setTicketData] = useState({
    type: "",
    price: "",
    total_quantity: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to create a new ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Ticket dataaa--- ",
      ticketData.type,
      ticketData.price,
      ticketData.total_quantity
    );
    // Perform basic validation before sending data
    if (!ticketData.type || !ticketData.price || !ticketData.total_quantity) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // Make API call to upload the ticket
      const response = await fetch(SummaryApi.uploadTicket.url, {
        method: SummaryApi.uploadTicket.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Ticket created successfully!");
        // Redirect to All Tickets page after successful creation
        navigate("/admin-panel/all-tickets");
      } else {
        toast.error(data.message || "Failed to create ticket");
      }
    } catch (error) {
      toast.error("An error occurred while creating the ticket.");
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Ticket</h2>

      <form
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="total_quantity"
            className="block text-sm font-medium text-gray-700"
          >
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
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;

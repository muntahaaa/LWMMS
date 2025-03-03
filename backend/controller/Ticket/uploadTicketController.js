const {Ticket} = require('../../models');
const {
  validateTicketFields,
} = require("../../helpers/ticketValidationHelper");

const uploadTicketController = async (req, res) => {
  try {
    const { type, price, total_quantity } = req.body;

    // Log incoming ticket data to debug
    console.log("Incoming Ticket Data:", req.body);

    // Validate required fields
    if (!type || !price || !total_quantity) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled in.",
      });
    }

    console.log("Ticket --- ", Ticket);

    // Check if ticket type already exists in the database
    const existingTicket = await Ticket.findOne({ where: { type } });
    if (existingTicket) {
      return res.status(400).json({ message: "Ticket type already exists" });
    }

    console.log("No existing tickets with this type, creating new ticket");

    // Create the ticket record
    const newTicket = await Ticket.create({
      type,
      price,
      total_quantity,
    });

    console.log("\n New Ticket created:", newTicket);

    return res.status(201).json({
      success: true,
      message: "Ticket uploaded successfully.",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Error uploading ticket:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading ticket. Please try again later.",
    });
  }
};

module.exports = uploadTicketController;

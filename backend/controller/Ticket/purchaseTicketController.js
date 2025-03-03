const { Ticket, TicketRegistry } = require("../../models");
const ticketAvailabilityHelper = require("../../helpers/ticketAvailabilityHelper");

const purchaseTicketController = async (req, res) => {
  const { ticketId, quantity, entryDate } = req.body; // Ticket ID, Quantity, and Entry Date from the client
  const userId = req.userId; // User ID from the authentication token

  console.log("Received data: ", { ticketId, quantity, entryDate, userId });

  try {
    // Validate that the required fields are not null
    if (!ticketId || !userId || !entryDate || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Ticket ID, User ID, Entry Date, and valid Quantity are required fields",
      });
    }

    // Check ticket availability
    const availableTickets = await ticketAvailabilityHelper.checkTicketAvailability(
      ticketId,
      quantity,
      entryDate
    );

    if (!availableTickets) {
      return res.status(400).json({
        success: false,
        message: "Insufficient tickets available for the selected date.",
      });
    }

    // Create a new ticket registry entry
    const newTicketRegistry = await TicketRegistry.create({
      ticket_id: ticketId, // Use ticketId directly
      user_id: userId, // Use userId directly
      quantity,
      entry_date: entryDate,
      purchase_date: new Date(),
    });

    // Update ticket availability after the purchase
    await ticketAvailabilityHelper.updateTicketAvailability(ticketId, quantity, entryDate);

    return res.status(200).json({
      success: true,
      message: "Ticket purchased successfully.",
      data: newTicketRegistry,
    });
  } catch (error) {
    console.error("Error uploading ticket:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing the purchase. Please try again later.",
    });
  }
};

module.exports = purchaseTicketController;

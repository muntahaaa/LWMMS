// getAllTicketsController.js
const { Ticket } = require("../../models");

const getAllTicketsController = async (req, res) => {
  try {
    // Fetch all tickets from the database
    const tickets = await Ticket.findAll();
    console.log("Tickets----", tickets);

    // If no tickets are found
    if (!tickets.length) {
      return res.status(404).json({
        success: false,
        message: "No tickets available.",
      });
    }

    // Respond with the tickets
    return res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching tickets. Please try again later.",
    });
  }
};

module.exports = getAllTicketsController;

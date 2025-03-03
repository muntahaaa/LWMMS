// deleteTicketController.js
const { Ticket } = require("../../models");

const deleteTicketController = async (req, res) => {
  try {
    const { id } = req.body; // Expecting ticket id to delete

    // Validate that an id is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Ticket ID is required to delete the ticket.",
      });
    }

    // Check if the ticket exists
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    // Delete the ticket
    await ticket.destroy();

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: "Ticket deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error deleting ticket. Please try again later.",
    });
  }
};

module.exports = deleteTicketController;

// updateTicketController.js
const { Ticket } = require("../../models"); // Ensure you import your Ticket model
const { validateTicketFields } = require("../../helpers/ticketValidationHelper"); // Assuming you have a helper for validating ticket fields

const updateTicketController = async (req, res) => {
  try {
    const { id, title, contributorName, category, time_period, significance_level, tags, productImage, description, quantity, price, sellingPrice } = req.body;

    // Validate that all required fields are provided
    if (!id || !title || !category || !tags || !productImage || !description || !quantity || !price || !sellingPrice) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled in.",
      });
    }

    // Optionally, validate the ticket fields based on your business rules
    await validateTicketFields({ title, category, time_period, significance_level });

    // Check if ticket with provided id exists
    const existingTicket = await Ticket.findByPk(id);

    if (!existingTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    // Update the ticket with new values
    existingTicket.title = title;
    existingTicket.contributorName = contributorName;
    existingTicket.category = category;
    existingTicket.time_period = time_period;
    existingTicket.significance_level = significance_level;
    existingTicket.tags = tags;
    existingTicket.productImage = productImage;
    existingTicket.description = description;
    existingTicket.quantity = quantity; // Update the ticket quantity
    existingTicket.price = price;
    existingTicket.sellingPrice = sellingPrice; // Optional field, can be updated
    await existingTicket.save(); // Save the updated ticket

    // Respond with the updated ticket
    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully.",
      ticket: existingTicket,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error updating ticket. Please try again later.",
    });
  }
};

module.exports = updateTicketController;

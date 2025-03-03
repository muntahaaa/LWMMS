// ticketPurchaseHelper.js

const { Ticket, TicketRegistry } = require('../models'); // Import necessary models

/**
 * Verifies if a user can purchase the ticket.
 * It checks if the requested quantity is available for the selected date, 
 * and whether the user is attempting to buy tickets for the next 5 days from the purchase date.
 * @param {number} userId - The ID of the user attempting to purchase the ticket.
 * @param {number} ticketId - The ID of the ticket the user is attempting to purchase.
 * @param {number} requestedQuantity - The quantity the user wants to buy.
 * @param {string} selectedDate - The date for which the user wants to purchase the ticket.
 * @returns {Promise<Object>} - Returns a success or error message.
 */
const checkTicketAvailability = async (userId, ticketId, requestedQuantity, selectedDate) => {
  try {
    // Ensure the selected date is within the allowed 5 days window
    const purchaseDate = new Date();
    const selectedDateObj = new Date(selectedDate);

    const timeDifference = selectedDateObj - purchaseDate;
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    if (dayDifference < 0 || dayDifference > 5) {
      return {
        success: false,
        message: "You can only purchase tickets for the next 5 days including today.",
      };
    }

    // Fetch the ticket information from the database
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return {
        success: false,
        message: "Ticket not found.",
      };
    }

    // Check if the requested quantity exceeds the available quantity
    if (requestedQuantity > ticket.quantity) {
      return {
        success: false,
        message: `Only ${ticket.quantity} tickets are available for this day.`,
      };
    }

    // Check if the user has already purchased tickets for the selected date
    const existingPurchase = await TicketRegistry.findOne({
      where: {
        userId,
        ticketId,
        selectedDate,
      },
    });

    if (existingPurchase) {
      return {
        success: false,
        message: "You have already purchased tickets for this date.",
      };
    }

    // If everything checks out, return success
    return {
      success: true,
      message: "Ticket is available for purchase.",
    };
  } catch (error) {
    console.error("Error checking ticket availability:", error);
    return {
      success: false,
      message: "There was an error while checking ticket availability.",
    };
  }
};

/**
 * Processes the ticket purchase.
 * It creates a new entry in the TicketRegistry table for the user.
 * @param {number} userId - The ID of the user purchasing the ticket.
 * @param {number} ticketId - The ID of the ticket being purchased.
 * @param {number} purchasedQuantity - The quantity of tickets being purchased.
 * @param {string} selectedDate - The date for which the ticket is being purchased.
 * @returns {Promise<Object>} - Returns a success or error message after processing the purchase.
 */
const processTicketPurchase = async (userId, ticketId, purchasedQuantity, selectedDate) => {
  try {
    // Check if the ticket is available for purchase
    const availabilityCheck = await checkTicketAvailability(userId, ticketId, purchasedQuantity, selectedDate);
    if (!availabilityCheck.success) {
      return availabilityCheck; // Return the failure message from availability check
    }

    // Create a new entry in TicketRegistry (representing the ticket purchase)
    const ticketRegistry = await TicketRegistry.create({
      userId,
      ticketId,
      quantity: purchasedQuantity,
      selectedDate,
      purchaseDate: new Date(), // Set the purchase date to current date
    });

    // Decrease the available ticket quantity for the selected date
    const ticket = await Ticket.findByPk(ticketId);
    ticket.quantity -= purchasedQuantity;
    await ticket.save();

    return {
      success: true,
      message: "Ticket purchase successful!",
      ticketRegistry,
    };
  } catch (error) {
    console.error("Error processing ticket purchase:", error);
    return {
      success: false,
      message: "There was an error while processing the ticket purchase.",
    };
  }
};

module.exports = {
  checkTicketAvailability,
  processTicketPurchase,
};

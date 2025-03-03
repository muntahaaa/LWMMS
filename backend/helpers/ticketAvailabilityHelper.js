// ticketAvailabilityHelper.js

/**
 * Checks if the requested quantity is available for the selected entry date.
 * @param {number} ticketId - The ID of the ticket.
 * @param {number} requestedQuantity - The quantity requested by the user.
 * @param {Date} selectedDate - The entry date chosen by the user.
 * @param {Object} TicketModel - The Sequelize model for tickets.
 * @param {Object} TicketRegistryModel - The Sequelize model for ticket registries.
 * @returns {Object} - Returns an object containing availability status and message.
 */

const { Ticket, TicketRegistry } = require("../models");
const checkTicketAvailability = async (
  ticketId,
  requestedQuantity,
  selectedDate,
) => {
  // Convert selectedDate to date object to compare with the registry dates
  const today = new Date();
  const fiveDaysAhead = new Date();
  fiveDaysAhead.setDate(today.getDate() + 5);

  // Check if the selected date is within the next 5 days
  if (selectedDate < today || selectedDate > fiveDaysAhead) {
    return {
      available: false,
      message: "Tickets can only be purchased for dates within the next 5 days, including today.",
    };
  }

  // Get the maximum available quantity for the ticket
  const ticket = await Ticket.findOne({
    where: { id: ticketId },
  });

  if (!ticket) {
    return {
      available: false,
      message: "Ticket not found.",
    };
  }

  const availableQuantity = ticket.quantity; // The quantity defined in the ticket
  const alreadyPurchased = await TicketRegistry.sum('quantity', {
    where: {
      ticket_id: ticketId,
      entry_date: selectedDate,
    }
  });

  // Check if there are enough tickets available for the requested quantity
  const remainingQuantity = availableQuantity - (alreadyPurchased || 0);

  if (requestedQuantity > remainingQuantity) {
    return {
      available: false,
      message: `Only ${remainingQuantity} tickets are available for the selected date.`,
    };
  }

  return {
    available: true,
    message: "Tickets are available.",
  };
};

/**
 * Updates ticket availability by reducing the available quantity in the database.
 * @param {number} ticketId - The ID of the ticket.
 * @param {number} purchasedQuantity - The quantity of tickets purchased by the user.
 * @param {Date} selectedDate - The entry date chosen by the user.
 * @param {Object} TicketRegistryModel - The Sequelize model for ticket registries.
 * @returns {Promise<Object>} - Returns a promise of the operation result.
 */
const updateTicketAvailability = async (
  ticketId,
  purchasedQuantity,
  selectedDate,
  TicketRegistryModel
) => {
  try {
    // Record the ticket purchase in the registry
    await TicketRegistryModel.create({
      ticket_id: ticketId,
      quantity: purchasedQuantity,
      entry_date: selectedDate,
      purchase_date: new Date(), // Automatically set to current date
    });

    // If needed, update the available quantity in the tickets table (if you're tracking it there)
    // This is optional and depends on how you want to structure your database.
    // You can also choose to keep the available quantity in the tickets table fixed and just track purchases separately.

    return { success: true, message: "Ticket purchase successful." };
  } catch (error) {
    console.error("Error updating ticket availability:", error);
    return { success: false, message: "An error occurred while processing the purchase." };
  }
};

module.exports = {
  checkTicketAvailability,
  updateTicketAvailability,
};

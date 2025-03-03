// ticketValidationHelper.js

/**
 * Validates the ticket data before uploading it.
 * @param {Object} data - The ticket data object.
 * @returns {Object} - Returns an object containing validation status and messages.
 */
const validateTicketData = (data) => {
    const errors = [];
  
    // Validate the title
    if (!data.title || data.title.trim() === "") {
      errors.push("Ticket title is required.");
    }
  
    // Validate the category
    if (!data.category || data.category.trim() === "") {
      errors.push("Ticket category is required.");
    }
  
    // Validate the time period
    if (!data.time_period || data.time_period.trim() === "") {
      errors.push("Ticket time period is required.");
    }
  
    // Validate the significance level
    if (!data.significance_level || data.significance_level.trim() === "") {
      errors.push("Ticket significance level is required.");
    }
  
    // Validate the tags (optional but can be helpful)
    if (data.tags && !Array.isArray(data.tags)) {
      errors.push("Tags must be an array.");
    }
  
    // Validate product images (at least one image should be there)
    if (!data.productImage || data.productImage.length === 0) {
      errors.push("At least one product image is required.");
    }
  
    // Validate that latitude and longitude are numbers and within expected ranges
    if (isNaN(data.latitude) || isNaN(data.longitude)) {
      errors.push("Latitude and Longitude should be valid numbers.");
    }
  
    // Return the validation result
    if (errors.length > 0) {
      return { valid: false, errors };
    }
  
    return { valid: true, errors: [] };
  };
  
  /**
   * Validates the purchase ticket request.
   * @param {Object} data - The ticket purchase data object.
   * @param {number} maxQuantity - The maximum quantity available for the ticket.
   * @param {Date} maxDate - The maximum allowable date for the purchase.
   * @returns {Object} - Returns an object containing validation status and messages.
   */
  const validateTicketPurchase = (data, maxQuantity, maxDate) => {
    const errors = [];
  
    // Validate quantity (must be a number and within the max available quantity)
    if (isNaN(data.quantity) || data.quantity <= 0) {
      errors.push("Quantity should be a positive number.");
    } else if (data.quantity > maxQuantity) {
      errors.push(`You can only purchase a maximum of ${maxQuantity} tickets.`);
    }
  
    // Validate entry date (must be within the next 5 days)
    const today = new Date();
    const entryDate = new Date(data.entryDate);
    if (entryDate < today || entryDate > maxDate) {
      errors.push("The entry date must be within the next 5 days, including today.");
    }
  
    // Return validation result
    if (errors.length > 0) {
      return { valid: false, errors };
    }
  
    return { valid: true, errors: [] };
  };
  
  module.exports = {
    validateTicketData,
    validateTicketPurchase
  };
  
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Ticket } = require("../../models");

const createPaymentIntentController = async (req, res) => {
  const { ticketId, quantity } = req.body;

  try {
    // Fetch ticket data from the database
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    // Calculate the total price based on the quantity
    const totalAmount = ticket.price * quantity;

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Amount in cents
      currency: "usd", // Set to your desired currency
      metadata: { ticketId, quantity },
    });

    console.log("client secret - ",paymentIntent.client_secret);

    // Respond with the payment intent client secret
    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating payment intent. Please try again.",
    });
  }
};

module.exports = createPaymentIntentController;

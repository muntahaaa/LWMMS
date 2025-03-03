// stripeHelper.js

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a Stripe Payment Intent.
 * @param {number} amount - The amount to be charged in cents (e.g., $10 would be 1000 cents).
 * @param {string} currency - The currency in which to charge (e.g., 'usd').
 * @returns {Promise<Object>} - Returns a Promise with the payment intent data.
 */
const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents (100 cents = $1)
      currency,
      automatic_payment_methods: { enabled: true },
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: "Payment intent created successfully",
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return {
      success: false,
      message: error.message || "Error creating payment intent",
    };
  }
};

/**
 * Confirms a Stripe Payment Intent using a provided payment method.
 * @param {string} paymentIntentId - The Stripe Payment Intent ID.
 * @param {string} paymentMethodId - The payment method ID obtained from the frontend.
 * @returns {Promise<Object>} - Returns a Promise with the result of the payment confirmation.
 */
const confirmPayment = async (paymentIntentId, paymentMethodId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });

    if (paymentIntent.status === 'succeeded') {
      return {
        success: true,
        message: "Payment successful",
        paymentIntent: paymentIntent,
      };
    } else {
      return {
        success: false,
        message: "Payment failed, please try again",
      };
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    return {
      success: false,
      message: error.message || "Error confirming payment",
    };
  }
};

/**
 * Handles Stripe Webhook for payment events (e.g., successful payments, charge failures).
 * @param {Object} req - The incoming request object from Stripe webhook.
 * @param {Object} res - The response object to send back the results of the webhook handling.
 * @returns {void}
 */
const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature and parse the event
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    // Handle the event based on the event type
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log(`PaymentIntent for ${paymentIntentSucceeded.amount} was successful!`);
        // You can perform any additional actions, like updating the order status in the DB.
        break;
      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object;
        console.log(`PaymentIntent for ${paymentIntentFailed.amount} failed.`);
        // You can update the order status to failed, etc.
        break;
      // Add more event types as needed
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Acknowledge receipt of the event
    res.json({ received: true });
  } catch (error) {
    console.log("Error while handling webhook:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

module.exports = {
  createPaymentIntent,
  confirmPayment,
  stripeWebhook,
};

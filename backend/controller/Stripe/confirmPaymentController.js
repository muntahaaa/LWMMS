const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const confirmPaymentController = async (req, res) => {
  const { paymentIntentId, paymentMethodId } = req.body;

  if (!paymentIntentId || !paymentMethodId) {
    return res.status(400).json({
      success: false,
      message: "PaymentIntent ID and PaymentMethod ID are required",
    });
  }

  try {
    // Fetch the payment intent to check its current status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Ensure the payment intent is in a valid state for confirmation
    if (paymentIntent.status === "succeeded") {
      return res.status(400).json({
        success: false,
        message: "Payment already succeeded.",
      });
    }

    // Confirm the payment intent if it's in a valid state
    const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });

    if (confirmedPaymentIntent.status === "succeeded") {
      return res.status(200).json({
        success: true,
        message: "Payment successful.",
        paymentIntentId: confirmedPaymentIntent.id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment failed. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);

    if (error.type === "StripeCardError") {
      return res.status(400).json({
        success: false,
        message: "Card was declined. Please try another card.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error confirming payment. Please try again later.",
      });
    }
  }
};

module.exports = confirmPaymentController;

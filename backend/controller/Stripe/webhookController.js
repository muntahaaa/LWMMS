const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { TicketRegistry, Ticket } = require("../../models");

const webhookController = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Your Stripe webhook secret
  const payload = req.body;

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event types that you're interested in
  switch (event.type) {
    case "payment_intent.succeeded":
      {
        const paymentIntent = event.data.object;
        const { id, amount_received, metadata, status } = paymentIntent;

        console.log(`PaymentIntent for ${amount_received} was successful!`);

        // Ensure payment succeeded before processing the order
        if (status === "succeeded") {
          try {
            // Update the ticket purchase status in your database
            const ticketRegistry = await TicketRegistry.findOne({
              where: {
                paymentIntentId: id, // Assuming you stored the paymentIntentId in the registry table
              },
            });

            if (!ticketRegistry) {
              throw new Error("Ticket registry not found");
            }

            // Mark the ticket as purchased in your system
            await ticketRegistry.update({
              status: "completed", // Assuming you have a status field to track ticket status
            });

            // Update ticket availability in the database (reduce the number of tickets available)
            await Ticket.update(
              { total_quantity: sequelize.literal("total_quantity - " + ticketRegistry.quantity) },
              { where: { id: ticketRegistry.ticket_id } }
            );

            // Respond with a success message
            return res.status(200).json({ message: "Payment successful, ticket purchased." });
          } catch (err) {
            console.error("Error processing payment success:", err);
            return res.status(500).json({ message: "Error processing payment success." });
          }
        }
      }
      break;

    case "payment_intent.failed":
      {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.id} failed`);

        // Handle failed payment (you can implement a retry mechanism here)
        try {
          const ticketRegistry = await TicketRegistry.findOne({
            where: {
              paymentIntentId: paymentIntent.id,
            },
          });

          if (!ticketRegistry) {
            throw new Error("Ticket registry not found");
          }

          // Mark the payment attempt as failed
          await ticketRegistry.update({
            status: "failed", // Mark as failed
          });

          return res.status(200).json({ message: "Payment failed. Ticket purchase was not completed." });
        } catch (err) {
          console.error("Error processing payment failure:", err);
          return res.status(500).json({ message: "Error processing payment failure." });
        }
      }
      break;

    default:
      // Handle other event types here
      console.log(`Unhandled event type: ${event.type}`);
      return res.status(200).json({ message: "Event type unhandled." });
  }

  res.status(200).json({ received: true });
};

module.exports = webhookController;

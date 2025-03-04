import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

const StripePaymentForm = ({ clientSecret, handlePaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Stripe Payment Error:", error);
      toast.error("Payment failed: " + error.message);
    } else if (paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");
      handlePaymentSuccess(paymentIntent);
    } else {
      console.error("Unexpected payment status:", paymentIntent.status);
      toast.error("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Enter Payment Details</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <label htmlFor="card-element" className="text-sm text-gray-700 mb-2">
          Credit or Debit Card
        </label>
        <CardElement id="card-element" className="border p-3 rounded" />

        {/* Display error message if exists */}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}

        <div className="mt-4">
          <button
            type="submit"
            disabled={loading || !stripe || !elements} // Disable if not ready
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
          >
            {loading ? "Processing..." : "Complete Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripePaymentForm;

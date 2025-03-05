import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { FaCreditCard, FaLock, FaTicketAlt } from "react-icons/fa";

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
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Payment Details</h2>

      {/* Ticket-shaped Payment Form */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg max-w-md mx-auto relative">
        {/* Ticket Ribbon */}
        <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-2 rounded-br-lg text-sm font-semibold flex items-center">
          <FaTicketAlt className="mr-2" /> Secure Payment
        </div>

        {/* Payment Form Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Museum of Art & History</h3>
          <p className="text-sm text-gray-600">Admission Ticket Purchase</p>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Details */}
          <div>
            <label htmlFor="card-element" className="text-sm text-gray-700 mb-2 flex items-center">
              <FaCreditCard className="mr-2 text-blue-600" /> Credit or Debit Card
            </label>
            <div className="mt-2"> {/* Added a wrapper div for the CardElement */}
              <CardElement
                id="card-element"
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full"
              />
            </div>
          </div>

          {/* Display error message if exists */}
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading || !stripe || !elements}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <FaLock className="mr-2" /> Complete Payment
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Message */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Your payment is securely processed by Stripe. No card details are stored on our servers.
          </p>
        </div>
      </div>

      {/* Optional: Add a decorative museum-themed background or illustration */}
      <div className="mt-12 text-center">
        <img
          src="https://via.placeholder.com/600x200.png?text=Museum+Illustration"
          alt="Museum Illustration"
          className="mx-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default StripePaymentForm;
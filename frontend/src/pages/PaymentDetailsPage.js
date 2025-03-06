import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import StripePaymentForm from "../components/StripePaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import SuccessPopup from "../components/SuccessPopup";
import { FaTicketAlt, FaCalendarDay, FaShoppingCart, FaInfoCircle } from "react-icons/fa";

// Initialize Stripe with your public API key
const stripePromise = loadStripe(
  "pk_test_51QyjPJAc6quVWDe20MBANndLIAdypz68dhfLF5K3VS0VCX5SOVu2ABeW6a9PXMWxxFzdJehLjhZkvsINwTQ2QKvh00NnnKktqT"
);

const PaymentDetailsPage = () => {
  const location = useLocation();
  const { selectedTicket, quantity, totalPrice, entryDate, clientSecret } = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePaymentSuccess = async (paymentIntent) => {
    const purchaseData = {
      ticketId: selectedTicket.id,
      quantity,
      entryDate: entryDate,
    };

    try {
      const response = await fetch(SummaryApi.purchaseTicket.url, {
        method: SummaryApi.purchaseTicket.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Ticket purchased successfully!");
        setIsModalOpen(true);
      } else {
        toast.error("Failed to purchase ticket");
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      toast.error("Error purchasing ticket");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Payment Details</h1>

      {/* Payment Summary Section */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg max-w-2xl mx-auto relative">
        {/* Ticket Ribbon */}
        <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-2 rounded-br-lg text-sm font-semibold flex items-center">
          <FaTicketAlt className="mr-2" /> Payment Summary
        </div>

        {/* Ticket Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{selectedTicket.type}</h2>
          <p className="text-sm text-gray-600">Liberation War Museum</p>
        </div>

        {/* Ticket Details */}
        <div className="space-y-4">
          <div className="flex items-center text-gray-700">
            <FaCalendarDay className="text-xl mr-2 text-blue-600" />
            <div>
              <span className="font-semibold">Entry Date:</span> {entryDate}
            </div>
          </div>
          <div className="flex items-center text-gray-700">
            <FaShoppingCart className="text-xl mr-2 text-blue-600" />
            <div>
              <span className="font-semibold">Quantity:</span> {quantity}
            </div>
          </div>
          <div className="flex items-center text-gray-700">
            <FaInfoCircle className="text-xl mr-2 text-blue-600" />
            <div>
              <span className="font-semibold">Total Price:</span> {totalPrice} BDT
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Payment Form */}
      {clientSecret ? (
        <Elements stripe={stripePromise}>
          <StripePaymentForm
            clientSecret={clientSecret}
            handlePaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      ) : (
        <p className="text-center text-lg text-gray-600 mt-8">Loading payment details...</p>
      )}

      {/* Success Popup Modal */}
      <SuccessPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTicket={selectedTicket}
        quantity={quantity}
        totalPrice={totalPrice}
      />

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

export default PaymentDetailsPage;
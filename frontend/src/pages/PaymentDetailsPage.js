
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import PaymentSummary from "../components/PaymentSummary";
import StripePaymentForm from "../components/StripePaymentForm";
import { Elements } from "@stripe/react-stripe-js"; // Import Elements provider
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
// Import loadStripe to initialize Stripe
import SuccessPopup from "../components/SuccessPopup"; // Import SuccessPopup


// Initialize Stripe with your public API key
const stripePromise = loadStripe(
  "pk_test_51QyjPJAc6quVWDe20MBANndLIAdypz68dhfLF5K3VS0VCX5SOVu2ABeW6a9PXMWxxFzdJehLjhZkvsINwTQ2QKvh00NnnKktqT"
); // Replace with your actual Stripe public key

const PaymentDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTicket, quantity, totalPrice,entryDate, clientSecret } = location.state;
  console.log("client Secret - ", clientSecret);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility


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
        setIsModalOpen(true); // Open the success popup
        //navigate("/my-tickets"); // Redirect to "My Tickets" page
      } else {
        toast.error("Failed to purchase ticket");
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      toast.error("Error purchasing ticket");
    }
  };

  

  return (
    <div>
      {clientSecret ? (
        <>
          <PaymentSummary
            selectedTicket={selectedTicket}
            quantity={quantity}
            totalPrice={totalPrice}
          />
          <Elements stripe={stripePromise}>
            {" "}
            {/* Wrap with Elements provider */}
            <StripePaymentForm
              clientSecret={clientSecret}
              handlePaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
          {/* Success Popup Modal */}
          <SuccessPopup
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedTicket={selectedTicket}
            quantity={quantity}
            totalPrice={totalPrice}
          />
        </>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default PaymentDetailsPage;

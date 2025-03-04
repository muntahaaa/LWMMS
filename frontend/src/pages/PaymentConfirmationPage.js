import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SummaryApi from "../common";
import PaymentSuccess from "../components/PaymentSuccess";
import PaymentFailure from "../components/PaymentFailure";
import { toast } from "react-toastify";

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticket, quantity, totalPrice, paymentIntentId } = location.state; // Passed from previous page

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Verify the payment status on backend after the user completes the Stripe payment
    const verifyPayment = async () => {
      try {
        const response = await fetch(SummaryApi.confirmPayment.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId,
            ticketId: ticket.id,
            quantity,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setPaymentStatus("success");
        } else {
          setPaymentStatus("failure");
          setErrorMessage(data.message || "Payment failed. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setPaymentStatus("failure");
        setErrorMessage("An error occurred while processing the payment.");
      }
    };

    verifyPayment();
  }, [paymentIntentId, ticket.id, quantity]);

  const retryPayment = () => {
    // You can implement a retry mechanism here
    toast.info("Please retry the payment.");
    navigate("/tickets"); // Redirect to tickets page to retry
  };

  return (
    <div>
      {paymentStatus === "success" ? (
        <PaymentSuccess ticket={ticket} quantity={quantity} totalPrice={totalPrice} />
      ) : paymentStatus === "failure" ? (
        <PaymentFailure errorMessage={errorMessage} retryPayment={retryPayment} />
      ) : (
        <p>Loading payment status...</p>
      )}
    </div>
  );
};

export default PaymentConfirmationPage;

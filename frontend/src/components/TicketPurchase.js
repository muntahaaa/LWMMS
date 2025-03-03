import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";  // This component will handle Stripe checkout

// Load Stripe outside of a component’s render to avoid recreating the object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const TicketPurchase = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);  // Default quantity to 1
  const [entryDate, setEntryDate] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState(0);  // To store available tickets for the selected date
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTicketDetails(ticketId);
  }, [ticketId]);

  // Fetch ticket details from the API
  const fetchTicketDetails = async (ticketId) => {
    setIsLoading(true);
    try {
      const response = await fetch(SummaryApi.getAllTickets.url, {
        method: SummaryApi.getAllTickets.method,
        body: JSON.stringify({ ticketId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setTicket(data.ticket);
        setAvailableQuantity(data.ticket.total_quantity);  // Set available quantity based on the ticket data
      } else {
        toast.error("Failed to fetch ticket details.");
      }
    } catch (error) {
      toast.error("Error fetching ticket details.");
    }
    setIsLoading(false);
  };

  // Handle form input changes
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDateChange = (e) => {
    setEntryDate(e.target.value);
  };

  // Handle ticket purchase
  const handlePurchase = async (e) => {
    e.preventDefault();

    if (!entryDate || !quantity) {
      return toast.error("Please select an entry date and quantity.");
    }

    if (quantity > availableQuantity) {
      return toast.error("Quantity exceeds the available tickets.");
    }

    // Call the backend to create a purchase record and get the payment intent
    try {
      const response = await fetch(SummaryApi.purchaseTicket.url, {
        method: SummaryApi.purchaseTicket.method,
        body: JSON.stringify({
          ticketId,
          entryDate,
          quantity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Ticket purchased successfully!");

        // Proceed to payment gateway
        navigate(`/checkout/${data.purchaseId}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error processing the purchase.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Purchase Ticket</h1>

      {isLoading ? (
        <p>Loading ticket details...</p>
      ) : (
        <>
          {ticket && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold">{ticket.type}</h2>
              <p className="text-lg text-gray-600">Price: ₹{ticket.price}</p>
              <p className="text-gray-600">
                Available Quantity: {availableQuantity}
              </p>

              <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                  <label htmlFor="entryDate" className="block text-gray-600">
                    Select Entry Date:
                  </label>
                  <input
                    type="date"
                    id="entryDate"
                    name="entryDate"
                    value={entryDate}
                    onChange={handleDateChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    min={new Date().toISOString().split("T")[0]} // Ensure the entry date is today or in the future
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-gray-600">
                    Select Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={availableQuantity}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TicketPurchase;

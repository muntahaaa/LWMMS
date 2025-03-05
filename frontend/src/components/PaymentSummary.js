import React from "react";
import { FaTicketAlt, FaShoppingCart, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";

const PaymentSummary = ({ selectedTicket, quantity, totalPrice }) => {
  return (
    <div className="container mx-auto p-6 bg-gray-50 ">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Payment Summary</h2>

      {/* Ticket-shaped Payment Summary */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg max-w-md mx-auto relative">
        

        {/* Ticket Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">{selectedTicket.type}</h3>
          <p className="text-sm text-gray-600">Museum of Art & History</p>
        </div>

        {/* Ticket Details */}
        <div className="space-y-4">
          <div className="flex items-center text-gray-700">
            <FaShoppingCart className="text-xl mr-2 text-blue-600" />
            <div>
              <span className="font-semibold">Quantity:</span> {quantity}
            </div>
          </div>
          <div className="flex items-center text-gray-700">
            <FaMoneyBillWave className="text-xl mr-2 text-blue-600" />
            <div>
              <span className="font-semibold">Price per Ticket:</span> ${selectedTicket.price}
            </div>
          </div>
          <div className="flex items-center text-gray-700">
            <FaCheckCircle className="text-xl mr-2 text-blue-600" />
            <div>
              <span className="font-semibold">Total Price:</span> ${totalPrice}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentSummary;
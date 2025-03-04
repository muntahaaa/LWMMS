import React from "react";

const PaymentSummary = ({ selectedTicket, quantity, totalPrice }) => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Summary</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">{selectedTicket.type}</h3>
        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
        <p className="text-sm text-gray-600">Price per ticket: ${selectedTicket.price}</p>
        <p className="text-lg font-bold text-gray-800">Total: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default PaymentSummary;

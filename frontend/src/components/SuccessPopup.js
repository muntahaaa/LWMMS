import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleSharp } from "react-icons/io5"; // Import check circle icon

const SuccessPopup = ({ isOpen, onClose, selectedTicket, quantity, totalPrice }) => {
  const navigate = useNavigate();

  const handleGoToMyTickets = () => {
    navigate("/my-tickets");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Payment Success"
      ariaHideApp={false} // This is important for accessibility
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="text-center p-6">
        <div className="flex justify-center mb-4">
          {/* React Icon for success */}
          <IoCheckmarkCircleSharp size={60} color="green" />
        </div>
        <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
        <p className="mt-2">You have successfully purchased {quantity} tickets for {selectedTicket.type}.</p>
        <p className="mt-2 font-semibold text-lg">Total: {totalPrice} BDT</p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleGoToMyTickets}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            My Tickets
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Home
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessPopup;

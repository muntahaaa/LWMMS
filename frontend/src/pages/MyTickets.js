import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common"; // Import API helper
import { toast } from "react-toastify";
import {
  FaTicketAlt,
  FaCalendarDay,
  FaShoppingCart,
  FaInfoCircle,
} from "react-icons/fa";
import { jsPDF } from "jspdf"; // Import jsPDF to generate PDF
import QRCode from "qrcode";

const MyTickets = () => {
  const [myTickets, setMyTickets] = useState([]);
  const navigate = useNavigate();

  // Fetch purchased tickets for the logged-in user
  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const response = await fetch(SummaryApi.viewPurchasedTickets.url, {
          method: SummaryApi.viewPurchasedTickets.method,
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setMyTickets(data.data); // Store the purchased tickets data
        } else {
          toast.error("Failed to fetch purchased tickets");
        }
      } catch (error) {
        console.error("Error fetching purchased tickets:", error);
        toast.error("Error fetching purchased tickets");
      }
    };

    fetchMyTickets();
  }, []); // Runs on component mount

  const handleTicketDetails = (ticketId) => {
    // Redirect to ticket details page for further info or to update the ticket
    navigate(`/ticket-details/${ticketId}`);
  };

  const handleDownloadPDF = async (ticket) => {
    try {
      // Generate QR Code Data
      const qrCodeData = JSON.stringify({
        ticketId: `LWM-${new Date().getFullYear()}-${Math.floor(
          Math.random() * 10000
        )
          .toString()
          .padStart(4, "0")}`,
        entryDate: ticket.entry_date,
        purchaseDate: ticket.purchase_date,
        quantity: ticket.quantity,
        type: ticket.type,
      });

      // Generate QR Code as Data URL
      const qrCodeDataUrl = await QRCode.toDataURL(qrCodeData, {
        errorCorrectionLevel: "H",
        type: "image/png",
        width: 128,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Background with subtle gradient effect
      doc.setFillColor(240, 248, 255);
      doc.rect(0, 0, 210, 297, "F");

      // Decorative Border with Patriotic Colors
      doc.setDrawColor(0, 102, 71); // Deep Green (Bangladesh Flag)
      doc.setLineWidth(2);
      doc.rect(10, 10, 190, 277, "D");

      // Header Section
      doc.setFillColor(0, 102, 71);
      doc.rect(10, 10, 190, 40, "F");

      // Museum Name
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("Liberation War Museum", 105, 35, { align: "center" });

      // Ticket Header
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("ENTRY TICKET", 105, 55, { align: "center" });

      // Ticket ID
      const ticketId = `LWM-${new Date().getFullYear()}-${Math.floor(
        Math.random() * 10000
      )
        .toString()
        .padStart(4, "0")}`;
      doc.setFontSize(12);
      doc.text(`Ticket ID: ${ticketId}`, 20, 70);

      // QR Code Integration
      doc.addImage(qrCodeDataUrl, "PNG", 150, 65, 40, 40);

      // Ticket Details
      doc.setFontSize(12);
      doc.text(`Entry Date: ${ticket.entry_date}`, 20, 100);
      doc.text(`Purchase Date: ${ticket.purchase_date}`, 20, 110);
      doc.text(`Number of Visitors: ${ticket.quantity}`, 20, 120);
      doc.text(`Ticket Type: ${ticket.type}`, 20, 130);

      // Historical Context Box
      doc.setFillColor(230, 230, 250);
      doc.rect(20, 150, 170, 50, "F");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(
        "The Liberation War Museum preserves the memory of Bangladesh's",
        105,
        165,
        { align: "center" }
      );
      doc.text(
        "struggle for independence and honors the sacrifices of its heroes.",
        105,
        172,
        { align: "center" }
      );

      // Museum Information
      doc.setFillColor(240, 240, 255);
      doc.rect(20, 210, 170, 60, "F");

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text("Museum Information", 105, 220, { align: "center" });

      doc.setFontSize(10);
      doc.text("Location: Sher-e Bangla Nagar Civic Centre", 105, 230, {
        align: "center",
      });
      doc.text("Agargaon, Dhaka, Bangladesh", 105, 237, { align: "center" });
      doc.text("Contact: +880-2-9143018", 105, 244, { align: "center" });
      doc.text("Website: www.liberationwarmuseum.org", 105, 251, {
        align: "center",
      });

      // Important Notes
      doc.setTextColor(178, 34, 38); // Deep Red
      doc.setFontSize(10);
      doc.text(
        "IMPORTANT GUIDELINES: Photography in designated areas only",
        20,
        280
      );

      // Save PDF
      doc.save(`${ticket.type}_Ticket.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center my-6 text-gray-800">
        My Tickets
      </h1>

      {/* Display list of purchased tickets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myTickets.length > 0 ? (
          myTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
              onClick={() => handleTicketDetails(ticket.id)}
            >
              {/* Ticket Ribbon */}
              <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-1 rounded-br-lg text-sm font-semibold">
                <FaTicketAlt className="inline-block mr-2" /> {ticket.type}
              </div>

              {/* Ticket Content */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center text-gray-700">
                  <FaCalendarDay className="text-xl mr-2 text-blue-600" />
                  <span className="font-semibold">Entry Date:</span>{" "}
                  {ticket.entry_date}
                </div>
                <div className="flex items-center text-gray-700">
                  <FaShoppingCart className="text-xl mr-2 text-blue-600" />
                  <span className="font-semibold">Purchase Date:</span>{" "}
                  {ticket.purchase_date}
                </div>
                <div className="flex items-center text-gray-700">
                  <FaInfoCircle className="text-xl mr-2 text-blue-600" />
                  <span className="font-semibold">Quantity:</span>{" "}
                  {ticket.quantity}
                </div>
              </div>

              {/* Ticket Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Show this ticket at the museum entrance.
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigating to ticket details page
                    handleDownloadPDF(ticket); // Trigger PDF download
                  }}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200"
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-lg text-gray-600">
              You have not purchased any tickets yet.
            </p>
            <button
              onClick={() => navigate("/tickets")} // Redirect to tickets page
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
            >
              Browse Tickets
            </button>
          </div>
        )}
      </div>

      {/* Optional: Add a decorative museum-themed background or illustration */}
      <div className="mt-12 text-center">
        <img
          src="/images/bg1.jpg"
          alt="Museum Illustration"
          className="mx-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default MyTickets;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFlag, FaInfoCircle, FaTicketAlt } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToExhibits = () => navigate("/exhibits");
  const navigateToAboutUs = () => navigate("/about-us");
  const navigateToTickets = () => navigate("/tickets");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url("/images/bg5.png")' }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto text-center z-10 relative pt-24">
          <h1 className="text-5xl md:text-7xl font-extrabold text-red-600 mb-6">
            Liberation War Museum
          </h1>
          <p className="text-lg md:text-2xl mb-6 text-gray-200">
            A Journey Through History, Freedom, and Sacrifice
          </p>
          <button
            onClick={navigateToExhibits}
            className="bg-red-700 hover:bg-red-800 text-white font-semibold px-8 py-4 rounded-full text-xl transition-all duration-200"
          >
            Explore Exhibits
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-100">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-700 rounded-lg shadow-xl hover:bg-gray-600 transition-colors duration-300">
              <FaFlag className="text-4xl mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-4 text-white">
                Heritage Exhibits
              </h3>
              <p className="text-gray-300">
                Explore artifacts, photos, and documents from the Liberation
                War. Experience the true history of our nation's struggle.
              </p>
            </div>
            <div className="p-8 bg-gray-700 rounded-lg shadow-xl hover:bg-gray-600 transition-colors duration-300">
              <FaInfoCircle className="text-4xl mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-4 text-white">
                Learn About the Heroes
              </h3>
              <p className="text-gray-300">
                Get inspired by the stories of the freedom fighters and their
                sacrifices during the Liberation War.
              </p>
            </div>
            <div className="p-8 bg-gray-700 rounded-lg shadow-xl hover:bg-gray-600 transition-colors duration-300">
              <FaTicketAlt className="text-4xl mb-4 text-red-600" />
              <h3 className="text-xl font-semibold mb-4 text-white">
                Buy Tickets
              </h3>
              <p className="text-gray-300">
                Plan your visit today! Purchase tickets online for a smooth and
                convenient experience.
              </p>
              <button
                onClick={navigateToTickets}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg"
              >
                Get Tickets
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-900 py-16 px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-100">
            About The Museum
          </h2>
          <p className="text-xl mb-6 text-gray-300">
            The Liberation War Museum is dedicated to preserving the memory of
            our country’s independence and the sacrifices made by millions. Our
            mission is to educate and inspire future generations by providing a
            deep understanding of the Liberation War of 1971.
          </p>
          <button
            onClick={navigateToAboutUs}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-full text-xl transition-all duration-200"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2025 Liberation War Museum. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

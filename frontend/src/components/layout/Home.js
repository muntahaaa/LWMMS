import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://source.unsplash.com/1600x900/?museum,history")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center mb-16">
        <h1 className="text-7xl font-extrabold tracking-wider text-[#d5d1c5] drop-shadow-lg">
          Welcome to
        </h1>
        <h1 className="text-7xl font-extrabold tracking-wider text-[#d5d1c5] drop-shadow-lg">
          Liberation War Museum
        </h1>
        <p className="mt-6 text-2xl text-gray-300">
          Discover the history, artifacts, and untold stories of the Liberation War.
        </p>
      </div>

      <div className="flex space-x-8">
        <Link
          to="/signup"
          className="text-black font-bold text-2xl px-12 py-6 bg-gradient-to-r from-[#d5d1c5] to-gray-300 text-white rounded-full shadow-lg hover:from-green-400 hover:to-green-700 transition-all duration-300 transform hover:scale-110"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="text-black font-bold text-2xl px-12 py-6 bg-gradient-to-r from-[#d5d1c5] to-gray-300 text-white rounded-full shadow-lg hover:from-blue-400 hover:to-blue-700 transition-all duration-300 transform hover:scale-110"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

const Login = () => {
  const [credentials, setCredentials] = useState({
    Email: "",
    Password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.Email || !credentials.Password) {
      setMessage("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/auth/login", credentials);
      const { access_token } = response.data.data;
      localStorage.setItem("access_token", access_token);
      setMessage("Login successful!");
      console.log(response.data);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setMessage("Login failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#d5d1c5" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please log in to your account
        </p>
        <div className="space-y-4">
          <input
            type="email"
            name="Email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          <input
            type="password"
            name="Password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-3 mt-6 text-lg font-semibold text-white rounded-lg transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-wait"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

import { createBrowserRouter } from 'react-router-dom'
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";  // Import loadStripe function
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import About from '../pages/About'
import Event from '../pages/Event'
import AllEvents from '../pages/AllEvents'
import MyEvents from '../pages/MyEvents'
import AllTickets from "../pages/AllTickets";
import MyTickets from "../pages/MyTickets";
import Tickets from "../pages/Tickets";
import CreateTicket from "../pages/CreateTicket";
import PaymentDetailsPage from "../pages/PaymentDetailsPage";
import HomePage from "../pages/HomePage";
import UserLogs from '../pages/EventLogs';
import TicketLogs from '../pages/TicketLogs';

const stripePromise = loadStripe("pk_test_51QyjPJAc6quVWDe20MBANndLIAdypz68dhfLF5K3VS0VCX5SOVu2ABeW6a9PXMWxxFzdJehLjhZkvsINwTQ2QKvh00NnnKktqT");
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "exhibits", element: <Home /> },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassowrd />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "product-category",
                element: <CategoryProduct />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "events",
                element: <Event />
            },
            {
                path: "my-events",
                element: <MyEvents />
            },

            { path: "tickets", element: <Tickets /> },
            { path: "my-tickets", element: <MyTickets /> },

            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    },
                    {
                        path: "all-events",
                        element: <AllEvents />
                    },
                    { path: "all-tickets", element: <AllTickets /> },
                    { path: "add-ticket", element: <CreateTicket /> },
                    { path: "user-logs", element: <UserLogs/> },
                    { path: "ticket-logs", element: <TicketLogs/> },
                ]
            },
            { path: "payment-details/:ticketId", element: <Elements stripe={stripePromise}>  {/* Wrap your components in Elements */}
            <PaymentDetailsPage />
          </Elements> }, // Payment details page route
          ],
        },
      ]);
      
      export default router;
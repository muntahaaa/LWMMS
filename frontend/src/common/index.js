const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUP: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomin}/api/userLogout`,
        method: 'get'
    },
    allUser: {
        url: `${backendDomin}/api/all-user`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomin}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomin}/api/upload-product`,
        method: 'post'
    },
    allProduct: {
        url: `${backendDomin}/api/get-product`,
        method: 'get'
    },
    updateProduct: {
        url: `${backendDomin}/api/update-product`,
        method: 'post'
    },
    categoryProduct: {
        url: `${backendDomin}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${backendDomin}/api/category-product`,
        method: 'post'
    },
    productDetails: {
        url: `${backendDomin}/api/product-details`,
        method: 'post'
    },
    addToCartProduct: {
        url: `${backendDomin}/api/addtocart`,
        method: 'post'
    },
    addToCartProductCount: {
        url: `${backendDomin}/api/countAddToCartProduct`,
        method: 'get'
    },
    addToCartProductView: {
        url: `${backendDomin}/api/view-cart-product`,
        method: 'get'
    },
    updateCartProduct: {
        url: `${backendDomin}/api/update-cart-product`,
        method: 'post'
    },
    deleteCartProduct: {
        url: `${backendDomin}/api/delete-cart-product`,
        method: 'post'
    },
    searchProduct: {
        url: `${backendDomin}/api/search`,
        method: 'get'
    },
    filterProduct: {
        url: `${backendDomin}/api/filter-product`,
        method: 'post'
    },
    deleteProduct: {
        url: `${backendDomin}/api/delete-product/:id`, // Replace with your actual delete event endpoint
        method: 'delete'
    },
    uploadEvent: {
        url: `${backendDomin}/api/upload-event`,
        method: 'post'
    },
    //event 
    allEvent: {
        url: `${backendDomin}/api/get-event`,
        method: 'get'
    },
    customEvent: {
        url: `${backendDomin}/custom-event/:eventId`,
        method: 'get'
    },
    updateEvent: {
        url: `${backendDomin}/api/update-event`,
        method: 'post'
    },
    deleteEvent: {
        url: `${backendDomin}/api/delete-event/:id`, // Replace with your actual delete event endpoint
        method: 'delete'
    },
    // Admin Routes for Ticket Management
    uploadTicket: {
        url: `${backendDomin}/api/upload-ticket`,
        method: "post",
    },
    updateTicket: {
        url: `${backendDomin}/api/update-ticket`,
        method: "post",
    },
    deleteTicket: {
        url: `${backendDomin}/api/delete-ticket`,
        method: "post",
    },
    getAllTickets: {
        url: `${backendDomin}/api/get-all-tickets`,
        method: "get",
    },

    // User Routes for Ticket Purchase
    purchaseTicket: {
        url: `${backendDomin}/api/purchase-ticket`,
        method: "post",
    },
    viewPurchasedTickets: {
        url: `${backendDomin}/api/view-purchased-ticket`,
        method: "get",
    },

    // Stripe Integration for Payments
    createPaymentIntent: {
        url: `${backendDomin}/api/create-payment-intent`,
        method: "post",
    },
    confirmPayment: {
        url: `${backendDomin}/api/confirm-payment`,
        method: "post",
    },
    stripeWebhook: {
        url: `${backendDomin}/api/webhook`,
        method: "post",
    },
    //log
    logEvent: {
        url: `${backendDomin}/api/log-event`,
        method: "get",
    },
    logTicket: {
        url: `${backendDomin}/api/log-ticket`,
        method: "get",
    },


}


export default SummaryApi
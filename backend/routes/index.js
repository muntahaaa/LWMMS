const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const UploadEventController = require('../controller/event/uploadEvent')
const getEventController = require('../controller/event/getEvent')
const updateEventController = require('../controller/event/updateEvent')
const deleteEventController = require('../controller/event/deleteEvent')
const deleteProductController = require('../controller/product/deleteProduct')
const uploadTicketController = require("../controller/Ticket/UploadTicketController");
const updateTicketController = require("../controller/Ticket/updateTicketController");
const deleteTicketController = require("../controller/Ticket/deleteTicketController");
const getAllTicketsController = require("../controller/Ticket/getAllTicketsController");
const purchaseTicketController = require("../controller/Ticket/purchaseTicketController");
const viewTicketController = require("../controller/Ticket/viewTicketController");
const webhookController = require("../controller/Stripe/webhookController");
const createPaymentIntentController = require("../controller/Stripe/createPaymentIntentController");
const confirmPaymentController = require("../controller/Stripe/confirmPaymentController");
const eventDetailsController = require('../controller/event/eventDetail')
const LogEventController = require('../controller/user/logEvent')
const LogTicketController = require('../controller/user/logTicket')




router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)
router.delete("/delete-product/:id",authToken,deleteProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


//event 
router.post("/upload-event",authToken,UploadEventController)
router.get("/get-event",getEventController)
router.get("/custom-event/:eventId",eventDetailsController)
router.post("/update-event",authToken,updateEventController)
router.delete("/delete-event/:id",authToken, deleteEventController);

//ticket
router.post("/upload-ticket", authToken, uploadTicketController);
router.post("/update-ticket", authToken, updateTicketController);
router.post("/delete-ticket", authToken, deleteTicketController);
router.get("/get-all-tickets", getAllTicketsController);
router.post("/purchase-ticket", authToken, purchaseTicketController);
router.get("/view-purchased-ticket", authToken, viewTicketController);

//log
router.get("/log-event",authToken,LogEventController)
router.get("/log-ticket",authToken,LogTicketController)

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookController
);
router.post("/create-payment-intent", createPaymentIntentController);
router.post("/confirm-payment", confirmPaymentController);


module.exports = router
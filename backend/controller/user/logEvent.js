const { User, Cart, Event } = require("../../models"); // Import Sequelize models

const LogEventController = async (req, res) => {
    try {
        // Ensure req.userId is provided
        if (!req.userId) {
            return res.status(400).json({
                message: "User ID is required",
                success: false,
                error: true,
            });
        }

        // Fetch cart items for the current user along with Event and User data
        const allCartItems = await Cart.findAll({
            //where: { userId: req.userId }, // Ensure req.userId is set, from your auth system
            include: [
                { model: Event, as: "event", attributes: ["eventName"] }, // Use alias 'event'
                { model: User, attributes: ["name"] }, // No alias needed
            ],
        });

        if (!allCartItems.length) {
            return res.json({
                message: "No Events found in the log",
                success: true,
                error: false,
                data: [],
            });
        }

        // Format the response data
        const formattedCartData = allCartItems.map((cartItem) => ({
            eventTitle: cartItem.event ? cartItem.event.eventName : "Event not found", // Use alias
            userName: cartItem.User ? cartItem.User.name : "User not found", // Use default model name
            quantity: cartItem.quantity,
            eventId: cartItem.eventId,
            userId: cartItem.userId,
        }));

        res.json({
            data: formattedCartData,
            success: true,
            error: false,
        });
    } catch (err) {
        console.error("Error in LogEventController:", err);
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = LogEventController;

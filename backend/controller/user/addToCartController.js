const { Cart } = require("../../models"); // Import Sequelize Cart model

const addToCartController = async (req, res) => {
    try {
        const { eventId, userId, registrationFee, paymentStatus, quantity } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required.",
                success: false,
                error: true,
            });
        }

        if (paymentStatus !== "paid") {
            return res.status(400).json({
                message: "Payment not completed. Cannot add to cart.",
                success: false,
                error: true,
            });
        }

        // ✅ Check if the event already exists for this user
        // const existingEvent = await Cart.findOne({ where: { eventId, userId } });

        // if (existingEvent) {
        //     return res.json({
        //         message: "Already exists in Cart",
        //         success: false,
        //         error: true,
        //     });
        // }

        // ✅ Ensure `quantity` and `paymentStatus` are included
        const payload = {
            eventId,
            userId,
            quantity,
            registrationFee,
            paymentStatus: "paid",
        };

        const savedCartEntry = await Cart.create(payload);

        return res.status(201).json({
            data: savedCartEntry,
            message: "Event successfully added to Cart.",
            success: true,
            error: false,
        });

    } catch (err) {
        console.error("Error saving to Cart:", err);
        res.status(500).json({
            message: err?.message || "Internal server error",
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartController;
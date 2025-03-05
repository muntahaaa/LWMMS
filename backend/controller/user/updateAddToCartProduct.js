const { Cart } = require("../../models"); // Import Sequelize Cart model

const updateAddToCartProduct = async (req, res) => {
    try {
        const addToCartEventId = req?.body?.id; // ✅ Change `id` to `id` (Sequelize uses `id`)
        const qty = req.body.quantity;

        // ✅ Sequelize equivalent of `updateOne()`
        const updateEvent= await Cart.update(
            { ...(qty && { quantity: qty }) }, // Only update if `qty` is provided
            { where: { id: addToCartEventId } }
        );

        res.json({
            message: "Event Updated",
            data: updateEvent,
            error: false,
            success: true
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = updateAddToCartProduct;

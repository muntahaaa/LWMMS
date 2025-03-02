const { Cart } = require("../../models"); // Import Sequelize Cart model

const updateAddToCartProduct = async (req, res) => {
    try {
        const addToCartProductId = req?.body?.id; // ✅ Change `id` to `id` (Sequelize uses `id`)
        const qty = req.body.quantity;

        // ✅ Sequelize equivalent of `updateOne()`
        const updateProduct = await Cart.update(
            { ...(qty && { quantity: qty }) }, // Only update if `qty` is provided
            { where: { id: addToCartProductId } }
        );

        res.json({
            message: "Product Updated",
            data: updateProduct,
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

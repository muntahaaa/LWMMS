const { Cart } = require("../../models"); // Import Sequelize Cart model

const deleteAddToCartProduct = async (req, res) => {
    try {
        const addToCartProductId = req.body.id; // ✅ Change `_id` to `id` (Sequelize uses `id`)

        // ✅ Sequelize equivalent of `deleteOne()`
        const deleteProduct = await Cart.destroy({ where: { id: addToCartProductId } });

        res.json({
            message: "Product Deleted From Cart",
            error: false,
            success: true,
            data: deleteProduct
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = deleteAddToCartProduct;

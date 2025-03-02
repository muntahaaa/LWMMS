const { Cart } = require("../../models"); // Import Sequelize Cart model

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId;

        // ✅ Sequelize equivalent of `countDocuments()`
        const count = await Cart.count({ where: { userId: userId } });

        res.json({
            data: {
                count: count
            },
            message: "ok",
            error: false,
            success: true
        });

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true, // Fix: Change error from `false` to `true`
            success: false,
        });
    }
};

module.exports = countAddToCartProduct;

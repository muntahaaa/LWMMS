const { Cart, Product } = require("../../models"); // Import Sequelize models

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId;

        // ✅ Sequelize equivalent of `find().populate("productId")`
        const allProduct = await Cart.findAll({
            where: { userId: currentUser },
            include: [
                {
                    model: Product, // Fetch related product details
                    as: "product", // Alias from associations
                },
            ],
        });

        res.json({
            data: allProduct,
            success: true,
            error: false,
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartViewProduct;

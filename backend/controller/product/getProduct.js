const { Product } = require("../../models"); // Import Sequelize Product model

const getProductController = async (req, res) => {
    try {
        // ✅ Sequelize equivalent of `find().sort({ createdAt: -1 })`
        const allProducts = await Product.findAll({
            order: [["createdAt", "DESC"]], // Sort by `createdAt` in descending order
        });

        res.json({
            message: "All Products",
            success: true,
            error: false,
            data: allProducts
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getProductController;

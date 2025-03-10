const { Product } = require("../../models"); // Import Sequelize Product model

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req?.body || req?.query;

        // ✅ Sequelize equivalent of `find({ category })`
        const artifacts = await Product.findAll({ where: { category } });

        res.json({
            data: artifacts,
            message: "Artifacts fetched successfully",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getCategoryWiseProduct;

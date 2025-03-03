const { Product } = require("../../models"); // Import Sequelize Product model

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;

        // ✅ Sequelize equivalent of `findById()`
        const artifact = await Product.findByPk(productId);

        res.json({
            data: artifact,
            message: "Ok",
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getProductDetails;

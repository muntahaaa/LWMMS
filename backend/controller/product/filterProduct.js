const { Product } = require("../../models"); // Import Sequelize Product model
const { Op } = require("sequelize"); // Import Sequelize Operators

const filterProductController = async (req, res) => {
    try {
        const categoryList = req?.body?.category || [];

        // ✅ Sequelize equivalent of `find({ category: { "$in": categoryList } })`
        const products = await Product.findAll({
            where: {
                category: {
                    [Op.in]: categoryList, // Use Sequelize `Op.in` for filtering
                }
            }
        });

        res.json({
            data: products,
            message: "Filtered products",
            error: false,
            success: true
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = filterProductController;

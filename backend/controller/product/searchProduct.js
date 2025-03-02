const { Product } = require("../../models"); // Import Sequelize Product model
const { Op } = require("sequelize"); // Import Sequelize Operators

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;

        // ✅ Sequelize equivalent of case-insensitive search using `Op.iLike`
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    { productName: { [Op.iLike]: `%${query}%` } }, // Case-insensitive search for productName
                    { category: { [Op.iLike]: `%${query}%` } } // Case-insensitive search for category
                ]
            }
        });

        res.json({
            data: products,
            message: "Search Product list",
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

module.exports = searchProduct;

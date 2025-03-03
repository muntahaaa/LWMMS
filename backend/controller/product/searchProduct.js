const { Product } = require("../../models"); // Import Sequelize Product model
const { Op } = require("sequelize"); // Import Sequelize Operators

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;

        // ✅ Sequelize equivalent of case-insensitive search using `Op.iLike`
        const artifacts = await Product.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } }, // Case-insensitive search for artifact title
                    { category: { [Op.iLike]: `%${query}%` } } // Case-insensitive search for category
                ]
            }
        });

        res.json({
            data: artifacts,
            message: "Search Artifact list",
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

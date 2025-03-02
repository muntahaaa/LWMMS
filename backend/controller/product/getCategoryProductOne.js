const { Product } = require("../../models"); // Import Sequelize Product model
const { Op } = require("sequelize");

const getCategoryProduct = async (req, res) => {
    try {
        // ✅ Get unique categories using Sequelize `findAll()` with `group`
        const categories = await Product.findAll({
            attributes: ["category"],
            group: ["category"]
        });

        console.log("categories", categories);

        // Extract category names from result
        const productCategories = categories.map(category => category.category);

        // ✅ Fetch one product per category
        const productByCategory = await Promise.all(
            productCategories.map(async (category) => {
                return await Product.findOne({ where: { category } });
            })
        );

        res.json({
            message: "Category-wise products",
            data: productByCategory.filter(product => product !== null), // Remove null values
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

module.exports = getCategoryProduct;

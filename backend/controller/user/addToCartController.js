const { Cart } = require("../../models"); // Import Sequelize Cart model

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        // ✅ Find existing product in cart (Sequelize version of findOne)
        const isProductAvailable = await Cart.findOne({ where: { productId, userId: currentUser } });

        console.log("isProductAvailable  ", isProductAvailable);

        if (isProductAvailable) {
            return res.json({
                message: "Already exists in Add to Cart",
                success: false,
                error: true,
            });
        }

        // ✅ Create new Cart entry
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        };

        const saveProduct = await Cart.create(payload); // Sequelize equivalent of `new Model().save()`

        return res.json({
            data: saveProduct,
            message: "Product Added to Cart",
            success: true,
            error: false,
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartController;

const uploadProductPermission = require('../../helpers/permission');
const { Product } = require('../../models'); // Import Sequelize Product model

async function updateProductController(req, res) {
    try {
        // ✅ Ensure permission check is awaited if it's an async function
        const hasPermission = await uploadProductPermission(req.userId);
        if (!hasPermission) {
            throw new Error("Permission denied");
        }

        const { id, ...resBody } = req.body; // ✅ Fix: Change `_id` to `id` for Sequelize

        // ✅ Sequelize equivalent of `findByIdAndUpdate()`
        const [updatedRowCount, updatedProducts] = await Product.update(resBody, {
            where: { id },
            returning: true, // ✅ Ensures updated product is returned
        });

        if (updatedRowCount === 0) {
            throw new Error("Product not found or no changes made");
        }

        res.json({
            message: "Product updated successfully",
            data: updatedProducts[0], // ✅ Return the updated product
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
}

module.exports = updateProductController;

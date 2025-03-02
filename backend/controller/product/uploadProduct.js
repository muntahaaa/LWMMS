const uploadProductPermission = require("../../helpers/permission");
const { Product } = require("../../models"); // Import Sequelize Product model

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;

        // ✅ Ensure permission check is awaited if it's an async function
        const hasPermission = await uploadProductPermission(sessionUserId);
        if (!hasPermission) {
            throw new Error("Permission denied");
        }

        // ✅ Sequelize equivalent of `new productModel(req.body).save()`
        const saveProduct = await Product.create(req.body);

        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = UploadProductController;

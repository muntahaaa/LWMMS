const uploadProductPermission = require("../../helpers/permission");
const { Product } = require("../../models"); // Import Sequelize Product model

async function updateProductController(req, res) {
  try {
    // ✅ Ensure permission check is awaited if it's an async function
    const hasPermission = await uploadProductPermission(req.userId);
    if (!hasPermission) {
      throw new Error("Permission denied");
    }

    const { id, ...resBody } = req.body; // ✅ Fix: Change `id` to `id` for Sequelize

    // ✅ Sequelize equivalent of `findByIdAndUpdate()`
    const [updatedRowCount, updatedArtifacts] = await Product.update(resBody, {
      where: { id },
      returning: true, // ✅ Ensures updated artifact is returned
    });

    if (updatedRowCount === 0) {
      throw new Error("Artifact not found or no changes made");
    }

    res.json({
      message: "Artifact updated successfully",
      data: updatedArtifacts[0], // ✅ Return the updated artifact
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateProductController;

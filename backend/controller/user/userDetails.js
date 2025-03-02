const userModel = require("../../db/models/usermodel");

async function userDetailsController(req, res) {
    try {
        console.log("User ID:", req.id);  // ✅ Log the correct ID

        if (!req.id) {
            return res.status(400).json({ message: "User ID is missing", error: true, success: false });
        }

        const user = await userModel.findByPk(req.id);

        if (!user) {
            return res.status(404).json({ message: "User not found", error: true, success: false });
        }

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details retrieved successfully"
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;

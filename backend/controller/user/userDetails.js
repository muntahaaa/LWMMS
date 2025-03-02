const { User } = require("../../models"); // Import Sequelize User model

async function userDetailsController(req, res) {
    try {
        console.log("userId", req.userId);

        // ✅ Sequelize equivalent of `findById()`
        const user = await User.findByPk(req.userId);

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details"
        });

        console.log("user", user);

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;

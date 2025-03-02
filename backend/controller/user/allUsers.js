const { User } = require("../../models"); // Import Sequelize User model

async function allUsers(req, res) {
    try {
        console.log("userid all Users", req.userId);

        // ✅ Sequelize equivalent of `find()`
        const allUsers = await User.findAll();

        res.json({
            message: "All Users",
            data: allUsers,
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

module.exports = allUsers;

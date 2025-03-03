const { User } = require("../../models"); // Import Sequelize User model

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, email, name, role } = req.body;

        // ✅ Construct payload dynamically
        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };

        // ✅ Find the logged-in user by ID (Sequelize equivalent of `findByPk`)
        const user = await User.findByPk(sessionUser);

        console.log("user.role", user?.role);

        // ✅ Update user record and return updated user
        const [updatedRowCount] = await User.update(payload, { where: { id: userId } });

        if (updatedRowCount === 0) {
            throw new Error("User not found or no changes made");
        }

        // ✅ Fetch updated user details
        const updatedUser = await User.findByPk(userId);

        res.json({
            data: updatedUser,
            message: "User Updated",
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

module.exports = updateUser;

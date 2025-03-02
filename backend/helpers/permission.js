const { User } = require("../models"); // Import Sequelize User model

const uploadProductPermission = async (userId) => {
    const user = await User.findByPk(userId); // Sequelize uses findByPk instead of findById

    if (!user) return false; // Handle case where user is not found

    if (user.role === "ADMIN") {
        return true;
    }

    return false;
};

module.exports = uploadProductPermission;

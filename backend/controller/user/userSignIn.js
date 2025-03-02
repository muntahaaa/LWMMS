const bcrypt = require("bcryptjs");
const { User } = require("../../models"); // Import Sequelize User model
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        // ✅ Sequelize equivalent of `findOne()`
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        console.log("checkPassword", checkPassword);

        if (checkPassword) {
            const tokenData = {
                id: user.id, // ✅ Fix: Use `id` instead of `_id`
                email: user.email,
            };

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true,
            };

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false,
            });

        } else {
            throw new Error("Please check Password");
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;

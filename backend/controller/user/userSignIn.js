const bcrypt = require('bcryptjs');
const userModel = require("../../db/models/usermodel");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Please provide email", error: true, success: false });
        }
        if (!password) {
            return res.status(400).json({ message: "Please provide password", error: true, success: false });
        }

        const user = await userModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found", error: true, success: false });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({ message: "Incorrect password", error: true, success: false });
        }

        // Generate JWT token
        const tokenData = {
            id: user.id,  // ✅ Using "id" instead of "userId"
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" });

        // Cookie options
        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ Secure only in production
            sameSite: "Strict",
        };

        res.cookie("token", token, tokenOptions).status(200).json({
            message: "Login successfully",
            data: token,
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

module.exports = userSignInController;

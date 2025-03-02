const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const router = require("./routes");
const { sequelize } = require("./models"); // Import Sequelize instance

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;

// ✅ Use Sequelize instead of MongoDB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to PostgreSQL!");

    // ❌ Remove sync() to prevent duplicate tables
    // return sequelize.sync();

    // ✅ Use alter: true if you need schema updates but don’t want to drop tables
    //return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

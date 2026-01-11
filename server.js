require("dotenv").config();
const express = require("express");
const { authenticate, sync } = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");

// Import model to register it
require("./models/User.js");

const app = express();
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// DB connection + table creation
authenticate()
  .then(() => {
    console.log("✅ MySQL connected");
    return sync();
  })
  .then(() => {
    console.log("✅ Tables created");
  })
  .catch(err => {
    console.error("❌ Database error:", err);
  });

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
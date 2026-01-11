require("dotenv").config();
import express, { json } from "express";
import { authenticate, sync } from "./config/database";
import userRoutes from "./routes/userRoutes";

// Load models
import "./models/User";

const app = express();
app.use(json());

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

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});

const { validationResult } = require("express-validator");
const User = require("../models/User.js");

async function createUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });

    res.status(201).json({
      message: "User inserted successfully",
      data: user
    });

  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Username or Email already exists"
      });
    }

    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
}

module.exports = { createUser };

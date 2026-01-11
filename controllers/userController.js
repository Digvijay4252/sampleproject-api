const User = require("../models/User.js");
const bcrypt = require("bcrypt");

// REGISTER / CREATE USER
async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // Create user in DB
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Remove password from response
    const { id, username: name, email: userEmail } = newUser;

    res.status(201).json({
      success: true,
      message: 'User added successfully',
      data: { id, username: name, email: userEmail }
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Username or Email already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
}

// LOGIN USER
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Remove password from response
    const { id, username } = user;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { id, username, email }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { createUser, loginUser };

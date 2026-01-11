const express = require("express");
const router = express.Router();
const { userValidationRules, userLoginRules } = require("../validations/userValidation.js");
const { validationResult } = require("express-validator");
const { createUser, loginUser } = require("../controllers/userController");

// POST /signup
router.post('/signup', userValidationRules, (req, res, next) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next(); // pass to controller if validation passes
}, createUser);

router.post('/login', userLoginRules, (req, res, next) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next(); // pass to controller if validation passes
}, loginUser);

module.exports = router;

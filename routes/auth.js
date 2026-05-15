const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { shopName, ownerName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already registered",
      });
    }

    const shopId = Date.now().toString();

    const licenseToken =
      "CLP-" + Math.floor(100000 + Math.random() * 900000);

    const user = new User({
      shopName,
      ownerName,
      email,
      password,
      shopId,
      licenseToken,
    });

    await user.save();

    res.json({
      success: true,
      message: "Registration Success",
      user,
      token: "clothpro-token",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      password,
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    if (!user.isActive) {
      return res.json({
        success: false,
        message: "Account Blocked",
      });
    }

    if (
      user.expiryDate &&
      new Date(user.expiryDate) < new Date()
    ) {
      return res.json({
        success: false,
        message: "Subscription Expired",
      });
    }

    res.json({
      success: true,
      message: "Login Success",
      user,
      token: user.licenseToken,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
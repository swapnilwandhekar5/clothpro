const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const JWT_SECRET = "clothpro_super_secret_key";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const {
      shopName,
      ownerName,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message:
          "Email already exists ❌",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const shopId =
      "SHOP-" + Date.now();

    const user = new User({
      shopName,
      ownerName,
      email,
      password: hashedPassword,
      shopId,
    });

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        shopId: user.shopId,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message:
        "Shop registered ✅",

      token,

      user: {
        shopName:
          user.shopName,

        ownerName:
          user.ownerName,

        email: user.email,

        shopId:
          user.shopId,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Register Error ❌",
      error: error.message,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.json({
        success: false,
        message:
          "Invalid email ❌",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.json({
        success: false,
        message:
          "Wrong password ❌",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        shopId: user.shopId,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message:
        "Login successful ✅",

      token,

      user: {
        shopName:
          user.shopName,

        ownerName:
          user.ownerName,

        email: user.email,

        shopId:
          user.shopId,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Login Error ❌",
      error: error.message,
    });
  }
});

module.exports = router;
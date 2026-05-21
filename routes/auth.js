const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      shopName,
      ownerName,
      email,
      password,
      businessCategory,
      upiId,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      shopName,
      ownerName,
      email,
      password: hashedPassword,
      businessCategory,
      upiId: upiId || "swapnil@paytm",
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      "smartbizsecret",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      success: true,
      message: "Business Registered Successfully ✅",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Register Error ❌",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      "smartbizsecret",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      success: true,
      message: "Login Success ✅",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Login Error ❌",
    });
  }
});

router.put("/update-upi/:id", async (req, res) => {
  try {
    const { upiId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        upiId,
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "UPI Updated ✅",
      user,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "UPI Update Failed ❌",
    });
  }
});

module.exports = router;
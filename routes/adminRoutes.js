const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const User = require("../models/User");

router.get("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({
      email: "admin@clothpro.com",
    });

    if (existingAdmin) {
      return res.json({
        success: true,
        message: "Admin already exists",
      });
    }

    const admin = new Admin({
      email: "admin@clothpro.com",
      password: "admin123",
    });

    await admin.save();

    res.json({
      success: true,
      message: "Admin created successfully",
      email: "admin@clothpro.com",
      password: "admin123",
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

    const admin = await Admin.findOne({
      email,
      password,
    });

    if (!admin) {
      return res.json({
        success: false,
        message: "Invalid Admin",
      });
    }

    res.json({
      success: true,
      message: "Admin Login Success",
      admin,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/shops", async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });

    res.json(users);
  } catch (error) {
    res.json([]);
  }
});

router.put("/toggle/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.isActive = !user.isActive;

    await user.save();

    res.json({
      success: true,
      message: "Shop Status Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/plan/:id", async (req, res) => {
  try {
    const { plan, expiryDate } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      plan,
      expiryDate,
    });

    res.json({
      success: true,
      message: "Plan Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
// backend/routes/staff.js

const express = require("express");

const router = express.Router();

const Staff = require("../models/Staff");

router.post("/register", async (req, res) => {
  try {
    const {
      shopId,
      shopName,
      name,
      mobile,
      email,
      password,
      role,
    } = req.body;

    if (
      !shopId ||
      !name ||
      !mobile ||
      !email ||
      !password
    ) {
      return res.json({
        success: false,
        message: "Fill all fields ❌",
      });
    }

    const existing = await Staff.findOne({
      email,
    });

    if (existing) {
      return res.json({
        success: false,
        message: "Staff already exists ❌",
      });
    }

    const staff = await Staff.create({
      shopId,
      shopName,
      name,
      mobile,
      email,
      password,
      role,
      status: "Pending",
    });

    return res.json({
      success: true,
      message: "Registration Submitted ✅",
      staff,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Registration Error ❌",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const staff = await Staff.findOne({
      email,
      password,
    });

    if (!staff) {
      return res.json({
        success: false,
        message: "Invalid Credentials ❌",
      });
    }

    if (staff.status !== "Approved") {
      return res.json({
        success: false,
        message:
          "Account pending for owner approval ⏳",
      });
    }

    return res.json({
      success: true,
      message: "Login Success ✅",
      user: {
        ...staff._doc,
        isStaff: true,
      },
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Login Error ❌",
    });
  }
});

router.get("/all/:shopId", async (req, res) => {
  try {
    const staff = await Staff.find({
      shopId: req.params.shopId,
    }).sort({ createdAt: -1 });

    res.json(staff);
  } catch (error) {
    console.log(error);
    res.json([]);
  }
});

router.put("/approve/:id", async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Staff Approved ✅",
      staff,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Approve Error ❌",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Staff Deleted ✅",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Delete Error ❌",
    });
  }
});

module.exports = router;
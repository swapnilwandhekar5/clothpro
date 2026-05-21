const express = require("express");
const router = express.Router();

const Staff = require("../models/Staff");

router.post("/add", async (req, res) => {
  try {
    const {
      shopId,
      shopName,
      ownerId,

      name,
      email,
      password,
      phone,

      role,
      salary,
      joiningDate,
    } = req.body;

    const existingStaff = await Staff.findOne({ email });

    if (existingStaff) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    let permissions = {
      dashboard: false,
      inventory: false,
      billing: true,
      analytics: false,
      khata: false,
      supplier: false,
      settings: false,
    };

    if (role === "Admin") {
      permissions = {
        dashboard: true,
        inventory: true,
        billing: true,
        analytics: true,
        khata: true,
        supplier: true,
        settings: true,
      };
    }

    if (role === "Manager") {
      permissions = {
        dashboard: true,
        inventory: true,
        billing: true,
        analytics: true,
        khata: true,
        supplier: true,
        settings: false,
      };
    }

    if (role === "Inventory Staff") {
      permissions = {
        dashboard: true,
        inventory: true,
        billing: false,
        analytics: false,
        khata: false,
        supplier: true,
        settings: false,
      };
    }

    if (role === "Cashier") {
      permissions = {
        dashboard: true,
        inventory: false,
        billing: true,
        analytics: false,
        khata: false,
        supplier: false,
        settings: false,
      };
    }

    const staff = new Staff({
      shopId,
      shopName,
      ownerId,

      name,
      email,
      password,
      phone,

      role,
      permissions,

      salary,
      joiningDate,
    });

    await staff.save();

    res.json({
      success: true,
      message: "Staff Added Successfully ✅",
      staff,
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

    const staff = await Staff.findOne({
      email,
      password,
    });

    if (!staff) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    if (!staff.isActive) {
      return res.json({
        success: false,
        message: "Staff account blocked",
      });
    }

    res.json({
      success: true,
      message: "Staff Login Success ✅",
      staff,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
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
    res.json([]);
  }
});

router.put("/toggle/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.json({
        success: false,
        message: "Staff not found",
      });
    }

    staff.isActive = !staff.isActive;

    await staff.save();

    res.json({
      success: true,
      message: "Staff Status Updated ✅",
      staff,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
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
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
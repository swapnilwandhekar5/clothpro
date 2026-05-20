const express = require("express");
const router = express.Router();

const Supplier = require("../models/Supplier");

router.post("/add", async (req, res) => {
  try {
    const { shopId, shopName, supplierName, phone, address, notes } = req.body;

    const supplier = new Supplier({
      shopId,
      shopName,
      supplierName,
      phone,
      address,
      notes,
    });

    await supplier.save();

    res.json({
      success: true,
      message: "Supplier Added ✅",
      supplier,
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
    const suppliers = await Supplier.find({
      shopId: req.params.shopId,
    }).sort({ createdAt: -1 });

    res.json(suppliers);
  } catch (error) {
    res.json([]);
  }
});

router.post("/purchase/:id", async (req, res) => {
  try {
    const { amount, description } = req.body;

    const supplier = await Supplier.findById(req.params.id);

    supplier.totalPurchase += Number(amount);
    supplier.balance += Number(amount);

    supplier.transactions.push({
      type: "purchase",
      amount: Number(amount),
      description: description || "Purchase added",
    });

    await supplier.save();

    res.json({
      success: true,
      message: "Purchase Added ✅",
      supplier,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/payment/:id", async (req, res) => {
  try {
    const { amount, description } = req.body;

    const supplier = await Supplier.findById(req.params.id);

    supplier.totalPaid += Number(amount);
    supplier.balance -= Number(amount);

    supplier.transactions.push({
      type: "payment",
      amount: Number(amount),
      description: description || "Payment paid",
    });

    await supplier.save();

    res.json({
      success: true,
      message: "Payment Added ✅",
      supplier,
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
    await Supplier.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Supplier Deleted ✅",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
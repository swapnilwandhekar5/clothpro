const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  invoiceNumber: String,

  productName: String,

  price: Number,

  costPrice: Number,

  quantity: Number,

  total: Number,

  profit: Number,

  shopName: String,

  shopId: String,

  date: {
    type: Date,
    default: Date.now,
  },
});

const Sale = mongoose.model("Sale", salesSchema);

// ADD SALE
router.post("/add", async (req, res) => {
  try {
    const invoiceNumber =
      "INV-" + Date.now();

    const sale = new Sale({
      ...req.body,
      invoiceNumber,
    });

    await sale.save();

    res.json({
      message: "Sale Saved ✅",
      sale,
    });
  } catch (error) {
    res.status(500).json({
      message: "Sale Save Error ❌",
      error: error.message,
    });
  }
});

// GET SALES BY SHOP
router.get("/all/:shopId", async (req, res) => {
  try {
    const sales = await Sale.find({
      shopId: req.params.shopId,
    }).sort({ date: -1 });

    res.json(sales);
  } catch (error) {
    res.status(500).json({
      message: "Sales Fetch Error ❌",
      error: error.message,
    });
  }
});

module.exports = router;
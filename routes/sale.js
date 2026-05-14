const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  quantity: Number,
  total: Number,
  shopName: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Sale = mongoose.model("Sale", salesSchema);

router.post("/add", async (req, res) => {
  try {
    const sale = new Sale(req.body);
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

router.get("/all", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({
      message: "Sales Fetch Error ❌",
      error: error.message,
    });
  }
});

module.exports = router;
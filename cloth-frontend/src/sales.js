const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

// SALES SCHEMA

const SalesSchema = new mongoose.Schema({
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

const Sale = mongoose.model(
  "Sale",
  SalesSchema
);

// ADD SALE

router.post("/add", async (req, res) => {
  try {
    const sale = new Sale(req.body);

    await sale.save();

    res.json({
      message: "Sale Saved",
    });
  } catch (error) {
    res.json(error);
  }
});

// GET SALES

router.get("/all", async (req, res) => {
  try {
    const sales = await Sale.find().sort({
      date: -1,
    });

    res.json(sales);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
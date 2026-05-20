const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

router.post("/add", async (req, res) => {
  try {
    const { shopId, shopName, customerName, phone, notes } = req.body;

    const customer = new Customer({
      shopId,
      shopName,
      customerName,
      phone,
      notes,
    });

    await customer.save();

    res.json({
      success: true,
      message: "Customer Added ✅",
      customer,
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
    const customers = await Customer.find({
      shopId: req.params.shopId,
    }).sort({ createdAt: -1 });

    res.json(customers);
  } catch (error) {
    res.json([]);
  }
});

router.post("/credit/:id", async (req, res) => {
  try {
    const { amount, description } = req.body;

    const customer = await Customer.findById(req.params.id);

    customer.totalCredit += Number(amount);
    customer.balance += Number(amount);

    customer.transactions.push({
      type: "credit",
      amount: Number(amount),
      description,
    });

    await customer.save();

    res.json({
      success: true,
      message: "Credit Added ✅",
      customer,
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

    const customer = await Customer.findById(req.params.id);

    customer.totalPaid += Number(amount);
    customer.balance -= Number(amount);

    customer.transactions.push({
      type: "payment",
      amount: Number(amount),
      description,
    });

    await customer.save();

    res.json({
      success: true,
      message: "Payment Added ✅",
      customer,
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
    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Customer Deleted ✅",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
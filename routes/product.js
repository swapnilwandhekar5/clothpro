const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ADD PRODUCT
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      price,
      costPrice,
      quantity,
      shopName,
      shopId,
      imageUrl,
      barcode,
    } = req.body;

    const product = new Product({
      name,
      price,
      costPrice,
      quantity,
      shopName,
      shopId,
      imageUrl,
      barcode,
    });

    await product.save();

    res.json({
      message: "Product added ✅",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Add product error ❌",
      error: error.message,
    });
  }
});

// GET PRODUCTS BY SHOP
router.get("/all/:shopId", async (req, res) => {
  try {
    const products = await Product.find({
      shopId: req.params.shopId,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Fetch error ❌",
      error: error.message,
    });
  }
});

// UPDATE PRODUCT
router.put("/update/:id", async (req, res) => {
  try {
    const updateData = {
      ...req.query,
      ...req.body,
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      message: "Product updated ✅",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update error ❌",
      error: error.message,
    });
  }
});

// DELETE PRODUCT
router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete error ❌",
      error: error.message,
    });
  }
});

module.exports = router;
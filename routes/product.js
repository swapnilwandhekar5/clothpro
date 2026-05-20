const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

router.post("/add", async (req, res) => {
  try {
    const {
      name,
      price,
      costPrice,
      quantity,
      imageUrl,
      barcode,
      shopName,
      shopId,
    } = req.body;

    const finalBarcode =
      barcode && barcode.trim() !== ""
        ? barcode
        : "CLP" + Date.now();

    const product = new Product({
      name,
      price,
      costPrice,
      quantity,
      imageUrl,
      barcode: finalBarcode,
      shopName,
      shopId,
    });

    await product.save();

    res.json({
      success: true,
      message: "Product Added Successfully",
      product,
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
    const products = await Product.find({
      shopId: req.params.shopId,
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.json([]);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { name, quantity } = req.query;

    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (quantity) {
      updateData.quantity = quantity;
    }

    await Product.findByIdAndUpdate(
      req.params.id,
      updateData
    );

    res.json({
      success: true,
      message: "Product Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
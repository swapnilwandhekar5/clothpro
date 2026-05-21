const express = require("express");
const router = express.Router();

const Invoice = require("../models/Invoice");
const Product = require("../models/Product");

router.post("/create", async (req, res) => {
  try {
    const {
      shopId,
      shopName,
      businessCategory,
      customerName,
      customerPhone,
      orderType,
      tableNumber,
      items,
      subtotal,
      gst,
      discount,
      finalTotal,
      paymentMode,
      paymentStatus,
      upiId,
    } = req.body;

    const invoiceNumber = "INV-" + Date.now();

    let totalProfit = 0;
    const finalItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) continue;

      const soldQty = Number(item.quantity);

      if (Number(product.quantity) < soldQty) {
        return res.json({
          success: false,
          message: `${product.name} stock not available`,
        });
      }

      const itemTotal = Number(item.price) * soldQty;

      const itemProfit =
        (Number(item.price) - Number(product.costPrice || 0)) *
        soldQty;

      totalProfit += itemProfit;

      product.quantity =
        Number(product.quantity) - soldQty;

      await product.save();

      finalItems.push({
        productId: product._id,
        productName: product.name,
        barcode: product.barcode,

        price: product.price,
        costPrice: product.costPrice || 0,
        quantity: soldQty,

        unit: product.unit,
        unitValue: product.unitValue,

        total: itemTotal,
        profit: itemProfit,

        size: product.size,
        color: product.color,
        brand: product.brand,
        batchNo: product.batchNo,
        expiryDate: product.expiryDate,
        imeiNumber: product.imeiNumber,
        serialNumber: product.serialNumber,
      });
    }

    const invoice = new Invoice({
      shopId,
      shopName,
      businessCategory,

      invoiceNumber,

      customerName: customerName || "Walk-in",
      customerPhone,

      orderType,
      tableNumber,

      items: finalItems,

      subtotal,
      gst,
      discount,
      finalTotal,
      totalProfit,

      paymentMode: paymentMode || "Cash",
      paymentStatus: paymentStatus || "Paid",

      upiId,
    });

    await invoice.save();

    res.json({
      success: true,
      message: "Invoice Created ✅",
      invoice,
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
    const invoices = await Invoice.find({
      shopId: req.params.shopId,
    }).sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    res.json([]);
  }
});

module.exports = router;
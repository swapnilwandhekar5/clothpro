const express = require("express");

const router = express.Router();

const Invoice = require("../models/Invoice");
const Product = require("../models/Product");
const Sale = require("../models/Sale");

router.post("/create", async (req, res) => {
  try {
    const {
      shopId,
      shopName,
      businessCategory,
      customerName,
      customerPhone,
      customerAddress,
      customerGST,
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

    if (!shopId || !items || items.length === 0) {
      return res.json({
        success: false,
        message: "Invoice items missing ❌",
      });
    }

    const invoiceNumber = "INV-" + Date.now();

    const invoice = await Invoice.create({
      invoiceNumber,
      shopId,
      shopName,
      businessCategory,
      customerName: customerName || "Walk-in",
      customerPhone: customerPhone || "",
      customerAddress: customerAddress || "",
      customerGST: customerGST || "",
      orderType: orderType || "",
      tableNumber: tableNumber || "",
      items,
      subtotal: Number(subtotal || 0),
      gst: Number(gst || 0),
      discount: Number(discount || 0),
      finalTotal: Number(finalTotal || 0),
      paymentMode: paymentMode || "Cash",
      paymentStatus: paymentStatus || "Paid",
      upiId: upiId || "",
      date: new Date(),
    });

    for (const item of items) {
      const qty = Number(item.quantity || item.qty || 0);
      const price = Number(item.price || 0);
      const costPrice = Number(item.costPrice || 0);
      const total = Number(item.total || price * qty);
      const profit = Number(item.profit || (price - costPrice) * qty);

      await Sale.create({
        invoiceNumber,
        shopId,
        shopName,
        businessCategory,
        productId: item.productId,
        productName: item.productName || item.name,
        barcode: item.barcode || "",
        hsnCode: item.hsnCode || item.hsn || "0000",
        price,
        costPrice,
        quantity: qty,
        total,
        profit,
        customerName: customerName || "Walk-in",
        customerPhone: customerPhone || "",
        paymentMode: paymentMode || "Cash",
        paymentStatus: paymentStatus || "Paid",
        date: new Date(),
      });

      if (item.productId && qty > 0) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: {
            quantity: -qty,
          },
        });
      }
    }

    return res.json({
      success: true,
      message: "Invoice Created & Sales Updated ✅",
      invoice,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Invoice Create Error ❌",
      error: error.message,
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
    console.log(error);
    res.json([]);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.json({
      success: true,
      invoice,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Invoice fetch error",
    });
  }
});

module.exports = router;

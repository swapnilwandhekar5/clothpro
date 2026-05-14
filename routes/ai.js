const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const Product = require("../models/Product");

// ✅ ADVANCED AI INSIGHTS
router.get("/insights/:shopName", async (req, res) => {
  try {
    const shopName = req.params.shopName;

    const sales = await Sale.find({ shopName });
    const products = await Product.find({ shopName });

    if (sales.length === 0) {
      return res.json({ message: "No data available" });
    }

    let totalProfit = 0;
    let totalRevenue = 0;

    const productProfitMap = {};
    const productSalesMap = {};

    sales.forEach(s => {
      totalProfit += s.profit || 0;
      totalRevenue += s.total || 0;

      // profit per product
      if (!productProfitMap[s.productName]) {
        productProfitMap[s.productName] = 0;
      }
      productProfitMap[s.productName] += s.profit || 0;

      // quantity per product
      if (!productSalesMap[s.productName]) {
        productSalesMap[s.productName] = 0;
      }
      productSalesMap[s.productName] += s.quantity;
    });

    // ✅ TOP SELLING
    let topProduct = "";
    let maxQty = 0;

    for (let key in productSalesMap) {
      if (productSalesMap[key] > maxQty) {
        maxQty = productSalesMap[key];
        topProduct = key;
      }
    }

    // ✅ BEST PROFIT PRODUCT
    let bestProfitProduct = "";
    let maxProfit = 0;

    for (let key in productProfitMap) {
      if (productProfitMap[key] > maxProfit) {
        maxProfit = productProfitMap[key];
        bestProfitProduct = key;
      }
    }

    // ❌ LOSS PRODUCTS
    const lossProducts = [];

    for (let key in productProfitMap) {
      if (productProfitMap[key] <= 0) {
        lossProducts.push(key);
      }
    }

    // 💤 DEAD STOCK (product exists but not sold)
    const deadStock = [];

    products.forEach(p => {
      if (!productSalesMap[p.name]) {
        deadStock.push(p.name);
      }
    });

    // 🤖 SUGGESTIONS
    let suggestions = [];

    if (totalProfit < 1000) {
      suggestions.push("Increase pricing or reduce cost 📈");
    }

    if (deadStock.length > 0) {
      suggestions.push(`Clear dead stock: ${deadStock.join(", ")}`);
    }

    if (lossProducts.length > 0) {
      suggestions.push(`Stop or fix loss products: ${lossProducts.join(", ")}`);
    }

    suggestions.push(`Focus on ${topProduct} 🚀`);
    suggestions.push(`High profit from ${bestProfitProduct} 💰`);

    res.json({
      totalRevenue,
      totalProfit,
      topProduct,
      bestProfitProduct,
      lossProducts,
      deadStock,
      suggestions
    });

  } catch (error) {
    console.log("AI ERROR:", error);
    res.status(500).send("Error aaya ❌");
  }
});

module.exports = router;
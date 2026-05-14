const express = require("express");

const router = express.Router();

const Sale = require("../models/Sale");

router.get("/stats", async (req, res) => {
  try {
    const sales = await Sale.find();

    let totalRevenue = 0;
    let totalProfit = 0;
    let totalSales = sales.length;

    const productCount = {};

    sales.forEach((sale) => {
      totalRevenue += sale.total;
      totalProfit += sale.profit;

      if (productCount[sale.productName]) {
        productCount[sale.productName]++;
      } else {
        productCount[sale.productName] = 1;
      }
    });

    let bestProduct = "";

    let max = 0;

    for (let product in productCount) {
      if (productCount[product] > max) {
        max = productCount[product];
        bestProduct = product;
      }
    }

    res.json({
      totalRevenue,
      totalProfit,
      totalSales,
      bestProduct,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error ❌",
    });
  }
});

module.exports = router;
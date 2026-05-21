const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const salesRoutes = require("./routes/sales");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customer");
const supplierRoutes = require("./routes/supplier");
const invoiceRoutes = require("./routes/invoice");
const staffRoutes = require("./routes/staff");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://zookal2407_db_user:swapnil123@swapnil.me1fpum.mongodb.net/smartbiz?retryWrites=true&w=majority&appName=swapnil"
  )
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("SmartBiz ERP API Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/staff", staffRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT} 🚀`);
});
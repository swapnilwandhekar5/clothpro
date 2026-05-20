const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/product");
const salesRoutes = require("./routes/sales");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customer");
const supplierRoutes = require("./routes/supplier");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ClothPro Backend Running 🚀");
});

app.use("/api/product", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/supplier", supplierRoutes);

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://zookal2407_db_user:swapnil1234@swapnil.me1fpum.mongodb.net/clothshop?retryWrites=true&w=majority&appName=swapnil"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
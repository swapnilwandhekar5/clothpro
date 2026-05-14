const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/product");
const salesRoutes = require("./routes/sales");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/product", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://zookal2407_db_user:swapnil1234@swapnil.me1fpum.mongodb.net/clothshop?retryWrites=true&w=majority&appName=swapnil"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
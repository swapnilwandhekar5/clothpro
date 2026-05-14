import { useEffect, useState } from "react";
import Login from "./Login";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  FaBox,
  FaChartBar,
  FaShoppingCart,
  FaTrash,
  FaEdit,
  FaPlus,
  FaPrint,
  FaMoneyBillWave,
  FaReceipt,
  FaBarcode,
  FaFileExcel,
  FaFilePdf,
} from "react-icons/fa";

import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("clothUser"))
  );

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [cart, setCart] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [barcode, setBarcode] = useState("");

  const [search, setSearch] = useState("");
  const [barcodeSearch, setBarcodeSearch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [analyticsRange, setAnalyticsRange] = useState("daily");

  const fetchProducts = async () => {
    if (!user) return;

    const res = await fetch(
      `https://clothpro.onrender.com/product/all/${user.shopId}`
    );

    const data = await res.json();
    setProducts(data);
  };

  const fetchSales = async () => {
    if (!user) return;

    const res = await fetch(
      `http://localhost:5000/api/sales/all/${user.shopId}`
    );

    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, [user]);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  const addProduct = async () => {
    if (!name || !price || !costPrice || !quantity || !barcode) {
      alert("Fill required fields");
      return;
    }

    await fetch("http://localhost:5000/api/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        costPrice,
        quantity,
        imageUrl,
        barcode,
        shopName: user.shopName,
        shopId: user.shopId,
      }),
    });

    setName("");
    setPrice("");
    setCostPrice("");
    setQuantity("");
    setImageUrl("");
    setBarcode("");

    fetchProducts();
    alert("Product Added ✅");
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/product/delete/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  const editProduct = async (id) => {
    const newName = prompt("Enter New Product Name");
    if (!newName) return;

    await fetch(`http://localhost:5000/api/product/update/${id}?name=${newName}`, {
      method: "PUT",
    });

    fetchProducts();
  };

  const addToCart = (product) => {
    if (product.quantity <= 0) {
      alert("Out of stock ❌");
      return;
    }

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    setActiveMenu("billing");
  };

  const addByBarcode = () => {
    const product = products.find(
      (item) => String(item.barcode) === String(barcodeSearch)
    );

    if (!product) {
      alert("Product not found ❌");
      return;
    }

    addToCart(product);
    setBarcodeSearch("");
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  );

  const gst = subtotal * 0.18;
  const discountAmount = Number(discount || 0);
  const finalTotal = subtotal + gst - discountAmount;

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  const totalValue = products.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const lowStockProducts = products.filter(
    (item) => Number(item.quantity) <= 2
  );

  const isInRange = (date) => {
    const saleDate = new Date(date);
    const now = new Date();

    if (analyticsRange === "daily") {
      return saleDate.toDateString() === now.toDateString();
    }

    if (analyticsRange === "weekly") {
      return now - saleDate <= 7 * 24 * 60 * 60 * 1000;
    }

    if (analyticsRange === "monthly") {
      return (
        saleDate.getMonth() === now.getMonth() &&
        saleDate.getFullYear() === now.getFullYear()
      );
    }

    if (analyticsRange === "yearly") {
      return saleDate.getFullYear() === now.getFullYear();
    }

    return true;
  };

  const filteredSales = sales.filter((sale) => isInRange(sale.date));

  const totalRevenue = filteredSales.reduce(
    (acc, item) => acc + Number(item.total),
    0
  );

  const totalProfit = filteredSales.reduce(
    (acc, item) => acc + Number(item.profit || 0),
    0
  );

  const totalOrders = filteredSales.length;

  const totalSoldQty = filteredSales.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  const productMap = {};

  filteredSales.forEach((sale) => {
    if (!productMap[sale.productName]) {
      productMap[sale.productName] = {
        product: sale.productName,
        revenue: 0,
        quantity: 0,
        profit: 0,
      };
    }

    productMap[sale.productName].revenue += Number(sale.total);
    productMap[sale.productName].quantity += Number(sale.quantity);
    productMap[sale.productName].profit += Number(sale.profit || 0);
  });

  const productChartData = Object.values(productMap);

  const bestProductName =
    productChartData.length > 0
      ? productChartData.reduce((a, b) =>
          a.quantity > b.quantity ? a : b
        ).product
      : "None";

  const revenueChartData = filteredSales.map((sale) => ({
    date: new Date(sale.date).toLocaleDateString(),
    revenue: Number(sale.total),
    profit: Number(sale.profit || 0),
  }));

  const exportExcel = () => {
    const data = filteredSales.map((item) => ({
      Invoice: item.invoiceNumber || "-",
      Product: item.productName,
      Price: item.price,
      Quantity: item.quantity,
      Total: item.total,
      Profit: item.profit || 0,
      Shop: item.shopName,
      Date: new Date(item.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

    XLSX.writeFile(workbook, "sales-report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${user.shopName} Sales Report`, 14, 20);

    doc.setFontSize(11);
    doc.text(`Range: ${analyticsRange}`, 14, 30);
    doc.text(`Revenue: ₹${totalRevenue}`, 14, 38);
    doc.text(`Profit: ₹${totalProfit}`, 14, 46);

    autoTable(doc, {
      startY: 55,
      head: [["Invoice", "Product", "Qty", "Total", "Profit", "Date"]],
      body: filteredSales.map((item) => [
        item.invoiceNumber || "-",
        item.productName,
        item.quantity,
        `₹${item.total}`,
        `₹${item.profit || 0}`,
        new Date(item.date).toLocaleDateString(),
      ]),
    });

    doc.save("sales-report.pdf");
  };

  const printInvoice = () => {
    const invoiceItems = cart
      .map(
        (item) => `
        <tr>
          <td>${item.name} x ${item.qty}</td>
          <td align="right">₹${item.price * item.qty}</td>
        </tr>
      `
      )
      .join("");

    const win = window.open("", "", "width=350,height=700");

    win.document.write(`
      <html>
        <head>
          <title>Thermal Invoice</title>
          <style>
            body{font-family: monospace;width:280px;padding:10px;}
            h2,p{text-align:center;margin:4px 0;}
            table{width:100%;border-collapse:collapse;margin-top:10px;}
            td{padding:4px 0;font-size:14px;}
            .line{border-top:1px dashed black;margin:8px 0;}
            .total{font-size:18px;font-weight:bold;}
            .footer{text-align:center;margin-top:20px;font-size:12px;}
          </style>
        </head>

        <body>
          <h2>${user.shopName}</h2>
          <p>Fashion Store</p>

          <div class="line"></div>

          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Customer: ${customerName || "Walk-in"}</p>

          <div class="line"></div>

          <table>${invoiceItems}</table>

          <div class="line"></div>

          <table>
            <tr><td>Subtotal</td><td align="right">₹${subtotal}</td></tr>
            <tr><td>GST</td><td align="right">₹${gst.toFixed(2)}</td></tr>
            <tr><td>Discount</td><td align="right">- ₹${discountAmount}</td></tr>
            <tr class="total"><td>Total</td><td align="right">₹${finalTotal.toFixed(2)}</td></tr>
          </table>

          <div class="line"></div>

          <div class="footer">
            Thank You<br/>
            Visit Again
          </div>
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  const saveSale = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart empty ❌");
        return;
      }

      for (const item of cart) {
        const itemProfit =
          (Number(item.price) - Number(item.costPrice || 0)) *
          Number(item.qty);

        await fetch("http://localhost:5000/api/sales/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName: item.name,
            price: item.price,
            costPrice: item.costPrice || 0,
            quantity: item.qty,
            total: item.price * item.qty,
            profit: itemProfit,
            shopName: user.shopName,
            shopId: user.shopId,
          }),
        });

        await fetch(
          `http://localhost:5000/api/product/update/${item._id}?quantity=${
            Number(item.quantity) - Number(item.qty)
          }`,
          {
            method: "PUT",
          }
        );
      }

      printInvoice();

      setCart([]);
      setCustomerName("");
      setDiscount(0);

      fetchProducts();
      fetchSales();

      alert("Sale Saved ✅");
    } catch (error) {
      console.log(error);
      alert("Sale Error ❌");
    }
  };

  const logout = () => {
    localStorage.removeItem("clothUser");
    localStorage.removeItem("clothToken");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      <div className="w-full lg:w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
        <h1 className="text-3xl font-bold mb-3">👕 ClothPro</h1>

        <p className="text-slate-400 mb-6">{user.shopName}</p>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:space-y-0">
          {["dashboard", "inventory", "analytics", "billing"].map((menu) => (
            <div
              key={menu}
              onClick={() => setActiveMenu(menu)}
              className={`p-4 rounded-2xl cursor-pointer transition capitalize text-center lg:text-left ${
                activeMenu === menu ? "bg-blue-500/20" : "hover:bg-white/10"
              }`}
            >
              {menu}
            </div>
          ))}

          <button
            onClick={logout}
            className="w-full bg-red-500 p-4 rounded-2xl lg:mt-6 col-span-2 lg:col-span-1"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 lg:p-10 overflow-auto">
        <h1 className="text-3xl lg:text-5xl font-bold mb-2">
          Luxury SaaS Dashboard 🚀
        </h1>

        <p className="text-slate-400 mb-10">Welcome, {user.ownerName}</p>

        {activeMenu === "dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-600 to-cyan-500 p-8 rounded-3xl"
              >
                <FaBox size={40} />
                <h2 className="text-2xl mt-6">Total Products</h2>
                <h1 className="text-5xl font-bold mt-4">{totalProducts}</h1>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-600 to-pink-500 p-8 rounded-3xl"
              >
                <FaChartBar size={40} />
                <h2 className="text-2xl mt-6">Total Stock</h2>
                <h1 className="text-5xl font-bold mt-4">{totalStock}</h1>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-emerald-600 to-lime-500 p-8 rounded-3xl"
              >
                <FaShoppingCart size={40} />
                <h2 className="text-2xl mt-6">Inventory Value</h2>
                <h1 className="text-5xl font-bold mt-4">₹{totalValue}</h1>
              </motion.div>
            </div>

            {lowStockProducts.length > 0 && (
              <div className="mt-10 bg-red-500/20 border border-red-500 p-6 rounded-3xl">
                <h2 className="text-3xl font-bold mb-4">
                  ⚠ Low Stock Alert
                </h2>

                <div className="space-y-3">
                  {lowStockProducts.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between bg-black/20 p-4 rounded-2xl"
                    >
                      <span>{item.name}</span>

                      <span className="font-bold text-red-300">
                        Only {item.quantity} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeMenu === "inventory" && (
          <>
            <div className="bg-white/5 rounded-3xl p-6 lg:p-8 mb-10">
              <h2 className="text-3xl font-bold mb-6">Add Product</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <input className="bg-slate-900 p-4 rounded-2xl" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="bg-slate-900 p-4 rounded-2xl" placeholder="Selling Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input className="bg-slate-900 p-4 rounded-2xl" placeholder="Cost Price" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} />
                <input className="bg-slate-900 p-4 rounded-2xl" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <input className="bg-slate-900 p-4 rounded-2xl" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <input className="bg-slate-900 p-4 rounded-2xl" placeholder="Barcode Number" value={barcode} onChange={(e) => setBarcode(e.target.value)} />

                <button
                  onClick={addProduct}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-xl font-bold p-4"
                >
                  <FaPlus className="inline mr-2" />
                  Add
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
                <h2 className="text-3xl font-bold">Inventory</h2>

                <input
                  className="bg-slate-900 p-4 rounded-2xl"
                  placeholder="Search product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left">Image</th>
                      <th className="p-4 text-left">Product</th>
                      <th className="p-4 text-left">Barcode</th>
                      <th className="p-4 text-left">Sell</th>
                      <th className="p-4 text-left">Cost</th>
                      <th className="p-4 text-left">Stock</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products
                      .filter((item) =>
                        item.name.toLowerCase().includes(search.toLowerCase()) ||
                        String(item.barcode || "").includes(search)
                      )
                      .map((item) => (
                        <tr key={item._id} className="border-b border-white/5">
                          <td className="p-4">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-14 h-14 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center">
                                👕
                              </div>
                            )}
                          </td>

                          <td className="p-4">{item.name}</td>
                          <td className="p-4">{item.barcode || "-"}</td>
                          <td className="p-4">₹{item.price}</td>
                          <td className="p-4">₹{item.costPrice || 0}</td>
                          <td className="p-4">{item.quantity}</td>

                          <td className="p-4">
                            {Number(item.quantity) <= 2 ? (
                              <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-xl">
                                Low Stock
                              </span>
                            ) : (
                              <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-xl">
                                In Stock
                              </span>
                            )}
                          </td>

                          <td className="p-4 flex gap-3">
                            <button
                              onClick={() => editProduct(item._id)}
                              className="bg-blue-500 p-3 rounded-xl"
                            >
                              <FaEdit />
                            </button>

                            <button
                              onClick={() => deleteProduct(item._id)}
                              className="bg-red-500 p-3 rounded-xl"
                            >
                              <FaTrash />
                            </button>

                            <button
                              onClick={() => addToCart(item)}
                              className="bg-green-500 p-3 rounded-xl"
                            >
                              <FaShoppingCart />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeMenu === "analytics" && (
          <>
            <div className="flex flex-wrap gap-4 mb-8">
              {["daily", "weekly", "monthly", "yearly"].map((range) => (
                <button
                  key={range}
                  onClick={() => setAnalyticsRange(range)}
                  className={`px-6 py-3 rounded-2xl capitalize ${
                    analyticsRange === range
                      ? "bg-blue-500"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {range}
                </button>
              ))}

              <button
                onClick={exportExcel}
                className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700"
              >
                <FaFileExcel className="inline mr-2" />
                Excel
              </button>

              <button
                onClick={exportPDF}
                className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700"
              >
                <FaFilePdf className="inline mr-2" />
                PDF
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
              <div className="bg-gradient-to-br from-green-600 to-emerald-400 p-8 rounded-3xl">
                <FaMoneyBillWave size={40} />
                <h2 className="text-2xl mt-6">Revenue</h2>
                <h1 className="text-4xl font-bold mt-4">₹{totalRevenue}</h1>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-8 rounded-3xl">
                <FaMoneyBillWave size={40} />
                <h2 className="text-2xl mt-6">Profit</h2>
                <h1 className="text-4xl font-bold mt-4">₹{totalProfit}</h1>
              </div>

              <div className="bg-gradient-to-br from-orange-600 to-yellow-400 p-8 rounded-3xl">
                <FaReceipt size={40} />
                <h2 className="text-2xl mt-6">Orders</h2>
                <h1 className="text-4xl font-bold mt-4">{totalOrders}</h1>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-8 rounded-3xl">
                <FaChartBar size={40} />
                <h2 className="text-2xl mt-6">Sold Qty</h2>
                <h1 className="text-4xl font-bold mt-4">{totalSoldQty}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
              <div className="bg-white/5 rounded-3xl p-6 lg:p-8">
                <h2 className="text-3xl font-bold mb-6">Revenue & Profit Chart</h2>

                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={4} />
                      <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={4} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-6 lg:p-8">
                <h2 className="text-3xl font-bold mb-6">Product Performance</h2>

                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="product" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip />
                      <Bar dataKey="quantity" fill="#22c55e" />
                      <Bar dataKey="revenue" fill="#3b82f6" />
                      <Bar dataKey="profit" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}

        {activeMenu === "billing" && (
          <div className="bg-white/5 rounded-3xl p-6 lg:p-10">
            <h1 className="text-3xl lg:text-5xl font-bold mb-10">
              💳 Smart Billing System
            </h1>

            <div className="bg-slate-900 p-5 rounded-3xl mb-8 flex flex-col lg:flex-row gap-4">
              <input
                className="flex-1 bg-slate-800 p-4 rounded-2xl"
                placeholder="Scan / Enter Barcode"
                value={barcodeSearch}
                onChange={(e) => setBarcodeSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addByBarcode();
                  }
                }}
              />

              <button
                onClick={addByBarcode}
                className="bg-green-500 px-6 py-4 rounded-2xl font-bold"
              >
                <FaBarcode className="inline mr-2" />
                Add
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              <div>
                <input
                  className="w-full bg-slate-900 p-4 rounded-2xl mb-6"
                  placeholder="Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />

                <input
                  className="w-full bg-slate-900 p-4 rounded-2xl mb-6"
                  placeholder="Discount Amount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item._id} className="bg-slate-900 p-4 rounded-2xl">
                      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                        <div className="flex gap-4 items-center">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center">
                              👕
                            </div>
                          )}

                          <div>
                            <h2 className="font-bold text-xl">{item.name}</h2>
                            <p>₹{item.price}</p>
                            <p className="text-slate-400 text-sm">
                              Barcode: {item.barcode || "-"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                          <button
                            onClick={() => decreaseQty(item._id)}
                            className="bg-red-500 w-10 h-10 rounded-xl text-xl"
                          >
                            -
                          </button>

                          <span className="text-2xl font-bold">{item.qty}</span>

                          <button
                            onClick={() => increaseQty(item._id)}
                            className="bg-green-500 w-10 h-10 rounded-xl text-xl"
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="bg-red-700 px-4 py-2 rounded-xl"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 text-right text-xl font-bold">
                        Total: ₹{item.price * item.qty}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 p-6 lg:p-8 rounded-3xl">
                <h2 className="text-3xl font-bold mb-8">Invoice</h2>

                <div className="space-y-4 text-xl">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>- ₹{discountAmount}</span>
                  </div>

                  <div className="flex justify-between text-3xl font-bold border-t border-white/10 pt-4">
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={saveSale}
                  className="w-full mt-10 bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl text-xl font-bold"
                >
                  <FaPrint className="inline mr-2" />
                  Save & Print Bill
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
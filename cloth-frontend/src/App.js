import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import CustomerKhata from "./CustomerKhata";
import SupplierManagement from "./SupplierManagement";

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
  FaWhatsapp,
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

const uiByCategory = {
  Clothing: {
    appName: "ClothPro Fashion OS",
    icon: "👕",
    dashboardTitle: "Fashion Store Dashboard",
    subtitle: "Size, color, design, billing and stock management",
    inventoryTitle: "Fashion Inventory",
    billingTitle: "Fashion Billing System",
    analyticsTitle: "Fashion Sales Analytics",
    khataTitle: "Customer Credit Khata",
    supplierTitle: "Garment Supplier Management",
    itemName: "Product / Design Name",
    stockName: "Pieces Stock",
    barcodeName: "Barcode / SKU",
    addTitle: "Add Fashion Product",
    card1: "Total Designs",
    card2: "Total Pieces",
    card3: "Inventory Value",
    lowStock: "Low Stock Fashion Items",
    scanPlaceholder: "Scan / Enter Product Barcode",
  },
  Grocery: {
    appName: "Smart Grocery OS",
    icon: "🛒",
    dashboardTitle: "Grocery Store Dashboard",
    subtitle: "Kirana, expiry, MRP and daily stock management",
    inventoryTitle: "Grocery Inventory",
    billingTitle: "Grocery Billing System",
    analyticsTitle: "Grocery Sales Analytics",
    khataTitle: "Customer Udhar Khata",
    supplierTitle: "Grocery Supplier Management",
    itemName: "Grocery Item Name",
    stockName: "Stock Quantity",
    barcodeName: "Barcode / MRP Code",
    addTitle: "Add Grocery Item",
    card1: "Total Grocery Items",
    card2: "Available Stock",
    card3: "Stock Value",
    lowStock: "Low Stock Daily Essentials",
    scanPlaceholder: "Scan Grocery Barcode",
  },
  Medical: {
    appName: "MediStock OS",
    icon: "💊",
    dashboardTitle: "Medical Store Dashboard",
    subtitle: "Medicine billing, batch, expiry and stock tracking",
    inventoryTitle: "Medicine Inventory",
    billingTitle: "Medical Store Billing",
    analyticsTitle: "Medicine Sales Analytics",
    khataTitle: "Patient / Customer Khata",
    supplierTitle: "Pharma Supplier Management",
    itemName: "Medicine Name",
    stockName: "Medicine Stock",
    barcodeName: "Barcode / Batch Code",
    addTitle: "Add Medicine",
    card1: "Total Medicines",
    card2: "Medicine Stock",
    card3: "Medicine Value",
    lowStock: "Low Stock Medicines",
    scanPlaceholder: "Scan Medicine Barcode",
  },
  Restaurant: {
    appName: "Restaurant POS OS",
    icon: "🍽",
    dashboardTitle: "Restaurant POS Dashboard",
    subtitle: "Menu billing, kitchen stock and order analytics",
    inventoryTitle: "Menu / Stock Inventory",
    billingTitle: "Restaurant POS Billing",
    analyticsTitle: "Restaurant Sales Analytics",
    khataTitle: "Customer Due Management",
    supplierTitle: "Kitchen Supplier Management",
    itemName: "Menu Item / Raw Material",
    stockName: "Kitchen Stock",
    barcodeName: "Item Code",
    addTitle: "Add Menu / Stock Item",
    card1: "Menu Items",
    card2: "Kitchen Stock",
    card3: "Stock Value",
    lowStock: "Low Kitchen Stock",
    scanPlaceholder: "Enter Item Code",
  },
  Salon: {
    appName: "SalonPro OS",
    icon: "💇",
    dashboardTitle: "Salon Management Dashboard",
    subtitle: "Services, products, billing and customer tracking",
    inventoryTitle: "Services / Products",
    billingTitle: "Salon Billing System",
    analyticsTitle: "Salon Revenue Analytics",
    khataTitle: "Client Payment Khata",
    supplierTitle: "Beauty Product Supplier",
    itemName: "Service / Product Name",
    stockName: "Available Qty",
    barcodeName: "Service / Product Code",
    addTitle: "Add Service / Product",
    card1: "Total Services",
    card2: "Products Stock",
    card3: "Business Value",
    lowStock: "Low Beauty Product Stock",
    scanPlaceholder: "Enter Service / Product Code",
  },
  "Mobile Shop": {
    appName: "Mobile Retail OS",
    icon: "📱",
    dashboardTitle: "Mobile Shop Dashboard",
    subtitle: "Mobiles, accessories, IMEI and warranty billing",
    inventoryTitle: "Mobile & Accessories Inventory",
    billingTitle: "Mobile Shop Billing",
    analyticsTitle: "Mobile Sales Analytics",
    khataTitle: "Customer EMI / Credit Khata",
    supplierTitle: "Mobile Distributor Management",
    itemName: "Mobile / Accessory Name",
    stockName: "Stock Units",
    barcodeName: "Barcode / IMEI / SKU",
    addTitle: "Add Mobile / Accessory",
    card1: "Total Models",
    card2: "Units In Stock",
    card3: "Inventory Value",
    lowStock: "Low Stock Accessories",
    scanPlaceholder: "Scan IMEI / Barcode",
  },
  Electronics: {
    appName: "ElectroBiz OS",
    icon: "🖥",
    dashboardTitle: "Electronics Store Dashboard",
    subtitle: "Serial number, warranty and billing management",
    inventoryTitle: "Electronics Inventory",
    billingTitle: "Electronics Billing",
    analyticsTitle: "Electronics Sales Analytics",
    khataTitle: "Customer Credit Ledger",
    supplierTitle: "Electronics Supplier Management",
    itemName: "Electronic Product Name",
    stockName: "Available Units",
    barcodeName: "Barcode / Serial Code",
    addTitle: "Add Electronics Product",
    card1: "Total Products",
    card2: "Units Stock",
    card3: "Inventory Value",
    lowStock: "Low Stock Electronics",
    scanPlaceholder: "Scan Barcode / Serial Code",
  },
  Hardware: {
    appName: "HardwarePro OS",
    icon: "🧰",
    dashboardTitle: "Hardware Store Dashboard",
    subtitle: "Tools, units, bulk stock and contractor accounts",
    inventoryTitle: "Hardware Inventory",
    billingTitle: "Hardware Billing",
    analyticsTitle: "Hardware Sales Analytics",
    khataTitle: "Contractor / Customer Khata",
    supplierTitle: "Hardware Supplier Management",
    itemName: "Hardware Item Name",
    stockName: "Units / Bulk Stock",
    barcodeName: "Item Code / Barcode",
    addTitle: "Add Hardware Item",
    card1: "Total Items",
    card2: "Bulk Stock",
    card3: "Stock Value",
    lowStock: "Low Hardware Stock",
    scanPlaceholder: "Scan Item Code / Barcode",
  },
  Footwear: {
    appName: "FootwearPro OS",
    icon: "🥾",
    dashboardTitle: "Footwear Store Dashboard",
    subtitle: "Size-wise footwear stock and billing management",
    inventoryTitle: "Footwear Inventory",
    billingTitle: "Footwear Billing",
    analyticsTitle: "Footwear Sales Analytics",
    khataTitle: "Customer Credit Khata",
    supplierTitle: "Footwear Supplier Management",
    itemName: "Footwear Name / Model",
    stockName: "Pairs Stock",
    barcodeName: "Barcode / Model Code",
    addTitle: "Add Footwear Product",
    card1: "Total Models",
    card2: "Pairs In Stock",
    card3: "Inventory Value",
    lowStock: "Low Stock Footwear",
    scanPlaceholder: "Scan Footwear Barcode",
  },
  Cosmetics: {
    appName: "CosmeticBiz OS",
    icon: "💄",
    dashboardTitle: "Cosmetics Store Dashboard",
    subtitle: "Beauty products, expiry and billing management",
    inventoryTitle: "Cosmetics Inventory",
    billingTitle: "Cosmetics Billing",
    analyticsTitle: "Cosmetics Sales Analytics",
    khataTitle: "Customer Credit Khata",
    supplierTitle: "Cosmetics Supplier Management",
    itemName: "Cosmetic Product Name",
    stockName: "Product Stock",
    barcodeName: "Barcode / Product Code",
    addTitle: "Add Cosmetic Product",
    card1: "Total Products",
    card2: "Beauty Stock",
    card3: "Stock Value",
    lowStock: "Low Stock Cosmetics",
    scanPlaceholder: "Scan Cosmetic Barcode",
  },
  "General Store": {
    appName: "General Store OS",
    icon: "🏪",
    dashboardTitle: "General Store Dashboard",
    subtitle: "All item billing, inventory and customer khata",
    inventoryTitle: "General Store Inventory",
    billingTitle: "General Store Billing",
    analyticsTitle: "General Store Analytics",
    khataTitle: "Customer Udhar Khata",
    supplierTitle: "Supplier Management",
    itemName: "Item Name",
    stockName: "Stock Quantity",
    barcodeName: "Barcode / Item Code",
    addTitle: "Add Store Item",
    card1: "Total Items",
    card2: "Available Stock",
    card3: "Stock Value",
    lowStock: "Low Stock Items",
    scanPlaceholder: "Scan / Enter Barcode",
  },
  Other: {
    appName: "SmartBiz OS",
    icon: "🚀",
    dashboardTitle: "Smart Business Dashboard",
    subtitle: "Billing, inventory, analytics and business control",
    inventoryTitle: "Business Inventory",
    billingTitle: "Smart Billing System",
    analyticsTitle: "Business Analytics",
    khataTitle: "Customer Khata",
    supplierTitle: "Supplier Management",
    itemName: "Product / Service Name",
    stockName: "Stock Quantity",
    barcodeName: "Barcode / Code",
    addTitle: "Add Product / Service",
    card1: "Total Items",
    card2: "Total Stock",
    card3: "Business Value",
    lowStock: "Low Stock Alert",
    scanPlaceholder: "Scan / Enter Code",
  },
};

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
  const [qrImage, setQrImage] = useState("");

  const upiId = "swapnilwandhekar143sp@okaxis";
  const category = user?.businessCategory || "Clothing";
  const ui = uiByCategory[category] || uiByCategory.Other;

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  );

  const gst = subtotal * 0.18;
  const discountAmount = Number(discount || 0);
  const finalTotal = subtotal + gst - discountAmount;

  const fetchProducts = async () => {
    if (!user) return;
    const res = await fetch(
      `https://clothpro.onrender.com/api/product/all/${user.shopId}`
    );
    const data = await res.json();
    setProducts(data);
  };

  const fetchSales = async () => {
    if (!user) return;
    const res = await fetch(
      `https://clothpro.onrender.com/api/sales/all/${user.shopId}`
    );
    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("clothUser"));
    if (!savedUser) return;

    const loadData = async () => {
      const productRes = await fetch(
        `https://clothpro.onrender.com/api/product/all/${savedUser.shopId}`
      );
      const productData = await productRes.json();
      setProducts(productData);

      const salesRes = await fetch(
        `https://clothpro.onrender.com/api/sales/all/${savedUser.shopId}`
      );
      const salesData = await salesRes.json();
      setSales(salesData);
    };

    loadData();
  }, [user]);

  useEffect(() => {
    const generateUPIQR = async () => {
      try {
        if (!user || finalTotal <= 0) {
          setQrImage("");
          return;
        }

        const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
          user.shopName
        )}&am=${finalTotal.toFixed(2)}&cu=INR`;

        const qr = await QRCode.toDataURL(upiUrl);
        setQrImage(qr);
      } catch (error) {
        console.log(error);
      }
    };

    generateUPIQR();
  }, [finalTotal, user]);

  if (window.location.pathname === "/admin") {
    return <AdminPanel />;
  }

  if (!user) {
    return <Login setUser={setUser} />;
  }

  const addProduct = async () => {
    if (!name || !price || !costPrice || !quantity) {
      alert("Fill required fields");
      return;
    }

    await fetch("https://clothpro.onrender.com/api/product/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    await fetch(`https://clothpro.onrender.com/api/product/delete/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const editProduct = async (id) => {
    const newName = prompt(`Enter New ${ui.itemName}`);
    if (!newName) return;

    await fetch(
      `https://clothpro.onrender.com/api/product/update/${id}?name=${newName}`,
      { method: "PUT" }
    );

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
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
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
      Category: category,
      Date: new Date(item.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${category} Report`);
    XLSX.writeFile(workbook, `${category}-sales-report.xlsx`);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${user.shopName} ${ui.analyticsTitle}`, 14, 20);
    doc.setFontSize(11);
    doc.text(`Category: ${category}`, 14, 30);
    doc.text(`Range: ${analyticsRange}`, 14, 38);
    doc.text(`Revenue: Rs ${totalRevenue}`, 14, 46);
    doc.text(`Profit: Rs ${totalProfit}`, 14, 54);

    autoTable(doc, {
      startY: 65,
      head: [["Invoice", "Item", "Qty", "Total", "Profit", "Date"]],
      body: filteredSales.map((item) => [
        item.invoiceNumber || "-",
        item.productName,
        item.quantity,
        `Rs ${item.total}`,
        `Rs ${item.profit || 0}`,
        new Date(item.date).toLocaleDateString(),
      ]),
    });

    doc.save(`${category}-sales-report.pdf`);
  };

  const printInvoice = () => {
    const invoiceItems = cart
      .map(
        (item) => `
        <tr>
          <td>${item.name} x ${item.qty}</td>
          <td align="right">Rs ${item.price * item.qty}</td>
        </tr>
      `
      )
      .join("");

    const win = window.open("", "", "width=350,height=700");
    win.document.write(`
      <html>
        <head>
          <title>${ui.billingTitle}</title>
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
          <p>${ui.billingTitle}</p>
          <div class="line"></div>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Customer: ${customerName || "Walk-in"}</p>
          <div class="line"></div>
          <table>${invoiceItems}</table>
          <div class="line"></div>
          <table>
            <tr><td>Subtotal</td><td align="right">Rs ${subtotal}</td></tr>
            <tr><td>GST</td><td align="right">Rs ${gst.toFixed(2)}</td></tr>
            <tr><td>Discount</td><td align="right">- Rs ${discountAmount}</td></tr>
            <tr class="total"><td>Total</td><td align="right">Rs ${finalTotal.toFixed(
              2
            )}</td></tr>
          </table>
          <div class="line"></div>
          ${
            qrImage
              ? `<div style="text-align:center;margin:10px 0;">
                  <p><b>Scan & Pay</b></p>
                  <img src="${qrImage}" style="width:150px;height:150px;" />
                  <p>${upiId}</p>
                </div>
                <div class="line"></div>`
              : ""
          }
          <div class="footer">
            Thank You<br/>
            Visit Again<br/>
            Powered By SmartBiz OS
          </div>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const sendWhatsAppInvoice = () => {
    if (cart.length === 0) {
      alert("Cart empty ❌");
      return;
    }

    const message = `
🧾 *${user.shopName}*

${ui.billingTitle}
Customer: ${customerName || "Walk-in"}
Date: ${new Date().toLocaleDateString()}

━━━━━━━━━━━━━━

${cart
  .map(
    (item) =>
      `▪ ${item.name}\nQty: ${item.qty} × Rs ${item.price}\nAmount: Rs ${
        item.price * item.qty
      }`
  )
  .join("\n\n")}

━━━━━━━━━━━━━━
Subtotal : Rs ${subtotal}
GST (18%) : Rs ${gst.toFixed(2)}
Discount : Rs ${discountAmount}

💰 *Grand Total : Rs ${finalTotal.toFixed(2)}*
UPI ID: ${upiId}
━━━━━━━━━━━━━━

🙏 Thank You
Visit Again

Powered By SmartBiz OS
`;

    const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank");
  };

  const saveSale = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart empty ❌");
        return;
      }

      for (const item of cart) {
        const itemProfit =
          (Number(item.price) - Number(item.costPrice || 0)) * Number(item.qty);

        await fetch("https://clothpro.onrender.com/api/sales/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
          `https://clothpro.onrender.com/api/product/update/${item._id}?quantity=${
            Number(item.quantity) - Number(item.qty)
          }`,
          { method: "PUT" }
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

  const menuLabels = {
    dashboard: "Dashboard",
    inventory: ui.inventoryTitle,
    analytics: ui.analyticsTitle,
    billing: ui.billingTitle,
    khata: ui.khataTitle,
    supplier: ui.supplierTitle,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      <div className="w-full lg:w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
        <h1 className="text-3xl font-bold mb-3">
          {ui.icon} {ui.appName}
        </h1>
        <p className="text-slate-400 mb-1">{user.shopName}</p>
        <p className="text-cyan-400 mb-6 text-sm">{category}</p>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:space-y-0">
          {["dashboard", "inventory", "analytics", "billing", "khata", "supplier"].map(
            (menu) => (
              <div
                key={menu}
                onClick={() => setActiveMenu(menu)}
                className={`p-4 rounded-2xl cursor-pointer transition text-center lg:text-left ${
                  activeMenu === menu ? "bg-blue-500/20" : "hover:bg-white/10"
                }`}
              >
                {menuLabels[menu]}
              </div>
            )
          )}

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
          {ui.icon} {ui.dashboardTitle}
        </h1>
        <p className="text-slate-400 mb-2">Welcome, {user.ownerName}</p>
        <p className="text-cyan-400 mb-10 text-lg">{ui.subtitle}</p>

        {activeMenu === "dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-600 to-cyan-500 p-8 rounded-3xl"
              >
                <FaBox size={40} />
                <h2 className="text-2xl mt-6">{ui.card1}</h2>
                <h1 className="text-5xl font-bold mt-4">{totalProducts}</h1>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-600 to-pink-500 p-8 rounded-3xl"
              >
                <FaChartBar size={40} />
                <h2 className="text-2xl mt-6">{ui.card2}</h2>
                <h1 className="text-5xl font-bold mt-4">{totalStock}</h1>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-emerald-600 to-lime-500 p-8 rounded-3xl"
              >
                <FaShoppingCart size={40} />
                <h2 className="text-2xl mt-6">{ui.card3}</h2>
                <h1 className="text-5xl font-bold mt-4">Rs {totalValue}</h1>
              </motion.div>
            </div>

            {lowStockProducts.length > 0 && (
              <div className="mt-10 bg-red-500/20 border border-red-500 p-6 rounded-3xl">
                <h2 className="text-3xl font-bold mb-4">⚠ {ui.lowStock}</h2>
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
              <h2 className="text-3xl font-bold mb-6">{ui.addTitle}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <input
                  className="bg-slate-900 p-4 rounded-2xl"
                  placeholder={ui.itemName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="bg-slate-900 p-4 rounded-2xl"
                  placeholder="Selling Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  className="bg-slate-900 p-4 rounded-2xl"
                  placeholder="Cost Price"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                />
                <input
                  className="bg-slate-900 p-4 rounded-2xl"
                  placeholder={ui.stockName}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                  className="bg-slate-900 p-4 rounded-2xl"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <input
                  className="bg-slate-900 p-4 rounded-2xl"
                  placeholder={`${ui.barcodeName} (optional)`}
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
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
                <h2 className="text-3xl font-bold">{ui.inventoryTitle}</h2>
                <input
                  className="bg-slate-900 p-4 rounded-2xl"
                  placeholder={`Search ${ui.itemName} / ${ui.barcodeName}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left">Image</th>
                      <th className="p-4 text-left">{ui.itemName}</th>
                      <th className="p-4 text-left">{ui.barcodeName}</th>
                      <th className="p-4 text-left">Sell</th>
                      <th className="p-4 text-left">Cost</th>
                      <th className="p-4 text-left">{ui.stockName}</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products
                      .filter(
                        (item) =>
                          item.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
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
                                {ui.icon}
                              </div>
                            )}
                          </td>
                          <td className="p-4">{item.name}</td>
                          <td className="p-4">{item.barcode || "-"}</td>
                          <td className="p-4">Rs {item.price}</td>
                          <td className="p-4">Rs {item.costPrice || 0}</td>
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
            <h2 className="text-4xl font-bold mb-6">{ui.analyticsTitle}</h2>
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
                <h1 className="text-4xl font-bold mt-4">Rs {totalRevenue}</h1>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-8 rounded-3xl">
                <FaMoneyBillWave size={40} />
                <h2 className="text-2xl mt-6">Profit</h2>
                <h1 className="text-4xl font-bold mt-4">Rs {totalProfit}</h1>
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
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#38bdf8"
                        strokeWidth={4}
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#22c55e"
                        strokeWidth={4}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white/5 rounded-3xl p-6 lg:p-8">
                <h2 className="text-3xl font-bold mb-6">{ui.itemName} Performance</h2>
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
              {ui.billingTitle}
            </h1>

            <div className="bg-slate-900 p-5 rounded-3xl mb-8 flex flex-col lg:flex-row gap-4">
              <input
                className="flex-1 bg-slate-800 p-4 rounded-2xl"
                placeholder={ui.scanPlaceholder}
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
                              {ui.icon}
                            </div>
                          )}
                          <div>
                            <h2 className="font-bold text-xl">{item.name}</h2>
                            <p>Rs {item.price}</p>
                            <p className="text-slate-400 text-sm">
                              {ui.barcodeName}: {item.barcode || "-"}
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
                        Total: Rs {item.price * item.qty}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 p-6 lg:p-8 rounded-3xl">
                <h2 className="text-3xl font-bold mb-8">{ui.billingTitle} Invoice</h2>

                {qrImage && (
                  <div className="flex flex-col items-center mb-6 bg-white/5 p-5 rounded-3xl border border-green-500/30">
                    <img
                      src={qrImage}
                      alt="UPI QR"
                      className="w-52 h-52 bg-white p-3 rounded-2xl"
                    />
                    <p className="mt-4 text-green-400 font-bold text-lg">
                      Scan & Pay ₹ {finalTotal.toFixed(2)}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">{upiId}</p>
                  </div>
                )}

                <div className="space-y-4 text-xl">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>Rs {gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>- Rs {discountAmount}</span>
                  </div>
                  <div className="flex justify-between text-3xl font-bold border-t border-white/10 pt-4">
                    <span>Total</span>
                    <span>Rs {finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={saveSale}
                  className="w-full mt-10 bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl text-xl font-bold"
                >
                  <FaPrint className="inline mr-2" />
                  Save & Print Bill
                </button>

                <button
                  onClick={sendWhatsAppInvoice}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 p-4 rounded-2xl text-xl font-bold"
                >
                  <FaWhatsapp className="inline mr-2" />
                  WhatsApp Invoice
                </button>
              </div>
            </div>
          </div>
        )}

        {activeMenu === "khata" && <CustomerKhata user={user} />}
        {activeMenu === "supplier" && <SupplierManagement user={user} />}
      </div>
    </div>
  );
}

export default App;

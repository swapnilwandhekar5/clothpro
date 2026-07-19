import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Login from "./Login";
import AdminPanel from "./AdminPanel";
import CustomerKhata from "./CustomerKhata";
import SupplierManagement from "./SupplierManagement";
import StaffManagement from "./StaffManagement";
import StaffLogin from "./StaffLogin";
import BusinessSettings from "./BusinessSettings";

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

import { motion } from
import { Html5QrcodeScanner } from "html5-qrcode";
 "framer-motion";

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
import { printThermalBill } from "./utils/printThermalBill";

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
  const [hsnCode, setHsnCode] = useState("");

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [mrp, setMrp] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [unit, setUnit] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [medicineType, setMedicineType] = useState("");
  const [imeiNumber, setImeiNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [warranty, setWarranty] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [itemType, setItemType] = useState("");
  const [kitchenCategory, setKitchenCategory] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");
  const [staffCommission, setStaffCommission] = useState("");
  const [unitType, setUnitType] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [saltComposition, setSaltComposition] = useState("");
  const [prescriptionRequired, setPrescriptionRequired] = useState("false");
  const [rackNumber, setRackNumber] = useState("");
  const [orderType, setOrderType] = useState("Dine-in");
  const [tableNumber, setTableNumber] = useState("");

  const [search, setSearch] = useState("");
  const [barcodeSearch, setBarcodeSearch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerGST, setCustomerGST] = useState("");
  const [discount, setDiscount] = useState(0);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [analyticsRange, setAnalyticsRange] = useState("daily");
  const [qrImage, setQrImage] = useState("");

  const upiId = user?.upiId || "";
  const category = user?.businessCategory || "Clothing";
  const ui = uiByCategory[category] || uiByCategory.Other;

  const renderCategoryFields = () => {
    const inputClass = "bg-slate-900 p-4 rounded-2xl";

    if (category === "Clothing" || category === "Footwear") {
      return (
        <>
          <input className={inputClass} placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
          <input className={inputClass} placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} />
          <input className={inputClass} placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </>
      );
    }

    if (category === "Grocery") {
      return (
        <>
          <input className={inputClass} placeholder="MRP" value={mrp} onChange={(e) => setMrp(e.target.value)} />
          <input className={inputClass} placeholder="Expiry Date" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          <select className={inputClass} value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="pcs">pcs</option>
            <option value="kg">kg</option>
            <option value="gram">gram</option>
            <option value="litre">litre</option>
            <option value="ml">ml</option>
            <option value="packet">packet</option>
          </select>
          <input className={inputClass} placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </>
      );
    }

    if (category === "Medical") {
      return (
        <>
          <input className={inputClass} placeholder="Batch No" value={batchNo} onChange={(e) => setBatchNo(e.target.value)} />
          <input className={inputClass} placeholder="Expiry Date" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          <input className={inputClass} placeholder="Medicine Type" value={medicineType} onChange={(e) => setMedicineType(e.target.value)} />
          <input className={inputClass} placeholder="MRP" value={mrp} onChange={(e) => setMrp(e.target.value)} />
          <input className={inputClass} placeholder="Salt Composition" value={saltComposition} onChange={(e) => setSaltComposition(e.target.value)} />
          <input className={inputClass} placeholder="Rack Number" value={rackNumber} onChange={(e) => setRackNumber(e.target.value)} />
          <select className={inputClass} value={prescriptionRequired} onChange={(e) => setPrescriptionRequired(e.target.value)}>
            <option value="false">Prescription Not Required</option>
            <option value="true">Prescription Required</option>
          </select>
        </>
      );
    }

    if (category === "Mobile Shop") {
      return (
        <>
          <input className={inputClass} placeholder="IMEI Number" value={imeiNumber} onChange={(e) => setImeiNumber(e.target.value)} />
          <input className={inputClass} placeholder="Model Number" value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} />
          <input className={inputClass} placeholder="Warranty" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
          <input className={inputClass} placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </>
      );
    }

    if (category === "Electronics") {
      return (
        <>
          <input className={inputClass} placeholder="Serial Number" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
          <input className={inputClass} placeholder="Model Number" value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} />
          <input className={inputClass} placeholder="Warranty" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
          <input className={inputClass} placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </>
      );
    }

    if (category === "Restaurant") {
      return (
        <>
          <input className={inputClass} placeholder="Item Type e.g. Food / Drink" value={itemType} onChange={(e) => setItemType(e.target.value)} />
          <input className={inputClass} placeholder="Kitchen Category" value={kitchenCategory} onChange={(e) => setKitchenCategory(e.target.value)} />
          <input className={inputClass} placeholder="Unit e.g. plate / kg" value={unit} onChange={(e) => setUnit(e.target.value)} />
        </>
      );
    }

    if (category === "Salon") {
      return (
        <>
          <input className={inputClass} placeholder="Service Duration e.g. 30 min" value={serviceDuration} onChange={(e) => setServiceDuration(e.target.value)} />
          <input className={inputClass} placeholder="Staff Commission" value={staffCommission} onChange={(e) => setStaffCommission(e.target.value)} />
          <input className={inputClass} placeholder="Service / Product Type" value={itemType} onChange={(e) => setItemType(e.target.value)} />
        </>
      );
    }

    if (category === "Hardware") {
      return (
        <>
          <input className={inputClass} placeholder="Unit Type e.g. pcs / kg / meter" value={unitType} onChange={(e) => setUnitType(e.target.value)} />
          <input className={inputClass} placeholder="Supplier Name" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
          <input className={inputClass} placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </>
      );
    }

    if (category === "Cosmetics") {
      return (
        <>
          <input className={inputClass} placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <input className={inputClass} placeholder="MRP" value={mrp} onChange={(e) => setMrp(e.target.value)} />
          <input className={inputClass} placeholder="Expiry Date" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </>
      );
    }

    return (
      <>
        <input className={inputClass} placeholder="Brand / Type" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input className={inputClass} placeholder="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
      </>
    );
  };

  const getProductDetails = (item) => {
    const details = [];

    if (item.size) details.push(`Size: ${item.size}`);
    if (item.color) details.push(`Color: ${item.color}`);
    if (item.brand) details.push(`Brand: ${item.brand}`);
    if (item.hsnCode || item.hsn) details.push(`HSN: ${item.hsnCode || item.hsn}`);
    if (item.mrp) details.push(`MRP: Rs ${item.mrp}`);
    if (item.expiryDate) details.push(`Exp: ${item.expiryDate}`);
    if (item.manufacturingDate) details.push(`MFG: ${item.manufacturingDate}`);
    if (item.unit) details.push(`Unit: ${item.unit}`);
    if (item.unitValue) details.push(`Unit Value: ${item.unitValue}`);
    if (item.batchNo) details.push(`Batch: ${item.batchNo}`);
    if (item.medicineType) details.push(`Type: ${item.medicineType}`);
    if (item.saltComposition) details.push(`Salt: ${item.saltComposition}`);
    if (item.prescriptionRequired) details.push("Rx Required");
    if (item.rackNumber) details.push(`Rack: ${item.rackNumber}`);
    if (item.imeiNumber) details.push(`IMEI: ${item.imeiNumber}`);
    if (item.serialNumber) details.push(`Serial: ${item.serialNumber}`);
    if (item.warranty) details.push(`Warranty: ${item.warranty}`);
    if (item.modelNumber) details.push(`Model: ${item.modelNumber}`);
    if (item.itemType) details.push(`Type: ${item.itemType}`);
    if (item.kitchenCategory) details.push(`Kitchen: ${item.kitchenCategory}`);
    if (item.serviceDuration) details.push(`Duration: ${item.serviceDuration}`);
    if (item.staffCommission) details.push(`Commission: ${item.staffCommission}`);
    if (item.unitType) details.push(`Unit Type: ${item.unitType}`);
    if (item.supplierName) details.push(`Supplier: ${item.supplierName}`);

    return details.length ? details.join(" | ") : "-";
  };

  const getExpiryStatus = (item) => {
    if (!item.expiryDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(item.expiryDate);
    expiry.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        label: "Expired",
        className: "bg-red-500/20 text-red-300",
      };
    }

    if (diffDays <= 30) {
      return {
        label: `Expiring in ${diffDays} days`,
        className: "bg-yellow-500/20 text-yellow-300",
      };
    }

    return {
      label: "Expiry OK",
      className: "bg-green-500/20 text-green-300",
    };
  };

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
        if (!user || !upiId || finalTotal <= 0) {
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

  if (window.location.pathname === "/staff-login") {
    return <StaffLogin setUser={setUser} />;
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
        hsnCode,
        hsn: hsnCode,
        businessCategory: category,

        size,
        color,
        brand,
        mrp,
        expiryDate,
        unit,
        batchNo,
        medicineType,
        imeiNumber,
        serialNumber,
        warranty,
        modelNumber,
        itemType,
        kitchenCategory,
        serviceDuration,
        staffCommission,
        unitType,
        supplierName,
        saltComposition,
        prescriptionRequired: prescriptionRequired === "true",
        rackNumber,

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
    setHsnCode("");
    setSize("");
    setColor("");
    setBrand("");
    setMrp("");
    setExpiryDate("");
    setUnit("");
    setBatchNo("");
    setMedicineType("");
    setImeiNumber("");
    setSerialNumber("");
    setWarranty("");
    setModelNumber("");
    setItemType("");
    setKitchenCategory("");
    setServiceDuration("");
    setStaffCommission("");
    setUnitType("");
    setSupplierName("");
    setSaltComposition("");
    setPrescriptionRequired("false");
    setRackNumber("");

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
        item._id === id
          ? { ...item, qty: Number(item.qty) + (category === "Grocery" ? 0.25 : 1) }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id !== id) return item;

        const step = category === "Grocery" ? 0.25 : 1;
        const nextQty = Number(item.qty) - step;

        return {
          ...item,
          qty: nextQty > 0 ? Number(nextQty.toFixed(2)) : step,
        };
      })
    );
  };

  const updateCartQty = (id, value) => {
    const numericQty = Number(value);

    if (!numericQty || numericQty <= 0) return;

    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: numericQty } : item
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

const printThermalBill = () => {
  if (cart.length === 0) {
    alert("Cart empty ❌");
    return;
  }

  const billNo = "INV-" + Date.now();

  const items = cart
    .map(
      (item) => `
<tr>
<td>${item.name}${item.size ? " (" + item.size + ")" : ""}</td>
<td align="center">${item.qty}</td>
<td align="right">${(item.price * item.qty).toFixed(2)}</td>
</tr>
`
    )
    .join("");

  const win = window.open("", "", "width=320,height=900");

  win.document.write(`
<html>

<head>

<title>Thermal Bill</title>

<style>

body{
width:58mm;
font-family:monospace;
font-size:12px;
padding:5px;
margin:0;
}

.center{
text-align:center;
}

table{
width:100%;
border-collapse:collapse;
}

td{
padding:2px 0;
font-size:12px;
}

.line{
border-top:1px dashed black;
margin:4px 0;
}

.total{
font-size:16px;
font-weight:bold;
}

img{
display:block;
margin:auto;
}

@media print{

body{
width:58mm;
}

}

</style>

</head>

<body>

<div class="center">

<h3>${user.shopName}</h3>

${user.businessAddress || ""}<br>

${user.businessMobile || ""}<br>

GST : ${user.gstNumber || "-"}<br>

</div>

<div class="line"></div>

Bill : ${billNo}<br>

Date : ${new Date().toLocaleDateString()}<br>

Time : ${new Date().toLocaleTimeString()}<br>

Customer : ${customerName || "Walk-in"}<br>

<div class="line"></div>

<table>

<tr>

<td><b>Item</b></td>

<td align="center"><b>Qty</b></td>

<td align="right"><b>Amt</b></td>

</tr>

${items}

</table>

<div class="line"></div>

<table>

<tr>

<td>Subtotal</td>

<td align="right">₹${subtotal.toFixed(2)}</td>

</tr>

<tr>

<td>GST</td>

<td align="right">₹${gst.toFixed(2)}</td>

</tr>

<tr>

<td>Discount</td>

<td align="right">₹${discountAmount.toFixed(2)}</td>

</tr>

<tr>

<td class="total">TOTAL</td>

<td class="total" align="right">₹${finalTotal.toFixed(2)}</td>

</tr>

</table>

<div class="line"></div>

${
  qrImage
    ? `<img src="${qrImage}" width="140" height="140"/>`
    : ""
}

<div class="center">

UPI : ${upiId || ""}

<br><br>

<b>Thank You</b>

<br>

Visit Again

</div>

</body>

</html>
`);

  win.document.close();

  win.print();
};
  const printTallyDocument = (documentType = "Invoice") => {
    const isQuotation = documentType === "Quotation";
    const invoiceNo =
      (isQuotation ? "QUO/" : "SB/") + new Date().getFullYear() + "/" + Date.now();

    const invoiceItems = cart
      .map(
        (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td class="desc-cell">
            <b>${item.name}</b><br/>
            ${item.size ? "Size: " + item.size + "<br/>" : ""}
            ${item.color ? "Color: " + item.color + "<br/>" : ""}
            ${item.brand ? "Brand: " + item.brand + "<br/>" : ""}
            ${item.imeiNumber ? "IMEI: " + item.imeiNumber + "<br/>" : ""}
            ${item.modelNumber ? "Model: " + item.modelNumber + "<br/>" : ""}
            ${item.warranty ? "Warranty: " + item.warranty + "<br/>" : ""}
            ${item.batchNo ? "Batch: " + item.batchNo + "<br/>" : ""}
            ${item.expiryDate ? "Exp: " + item.expiryDate : ""}
          </td>
          <td>${item.hsnCode || item.hsn || "0000"}</td>
          <td><b>${item.qty} ${item.unit || "Nos"}</b></td>
          <td>${Number(item.price).toFixed(2)}</td>
          <td>${item.unit || "Nos"}</td>
          <td>0</td>
          <td><b>${(item.price * item.qty).toFixed(2)}</b></td>
        </tr>
      `
      )
      .join("");

    const cgst = gst / 2;
    const sgst = gst / 2;

    const win = window.open("", "", "width=1000,height=900");

    win.document.write(`
<html>
<head>
<title>${isQuotation ? "Quotation" : "Thermal Bill"}</title>

<style>
*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:monospace;
}

body{
width:80mm;
padding:8px;
color:#000;
background:#fff;
font-size:12px;
}

.bill{
width:100%;
}

.center{
text-align:center;
}

.bold{
font-weight:bold;
}

hr{
border:none;
border-top:1px dashed #000;
margin:6px 0;
}

table{
width:100%;
border-collapse:collapse;
}
            <div class="center title">${isQuotation ? "Quotation" : "Tax Invoice"}</div>

            <table class="no-border">
              <tr>
                <td>
                  <b>${isQuotation ? "Quotation Ref" : "IRN"}</b> : ${invoiceNo}<br/>
                  <b>Ack No</b> : ${Date.now()}<br/>
                  <b>Date</b> : ${new Date().toLocaleDateString()}
                </td>
                <td class="center">
                  <b>${isQuotation ? "Estimate Copy" : "e-Invoice / UPI QR"}</b><br/>
                  ${qrImage && !isQuotation ? `<img src="${qrImage}" style="width:150px;height:150px;" />` : ""}
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td rowspan="3" style="width:50%;">
                  ${user.logoUrl ? `<img src="${user.logoUrl}" style="max-width:120px;max-height:70px;margin-bottom:5px;" /><br/>` : ""}
                  <b>${user.shopName}</b><br/>
                  ${user.businessAddress || "-"}<br/>
                  Mobile : ${user.businessMobile || "-"}<br/>
                  Email : ${user.businessEmail || "-"}<br/>
                  GSTIN/UIN : ${user.gstNumber || "-"}<br/>
                  State Name : ${user.businessState || "Maharashtra"}, Code : ${user.stateCode || "27"}<br/>
                  UPI ID : ${upiId || "-"}
                </td>
                <td>${isQuotation ? "Quotation No." : "Invoice No."}<br/><b>${invoiceNo}</b></td>
                <td>Dated<br/><b>${new Date().toLocaleDateString()}</b></td>
              </tr>
              <tr>
                <td>Delivery Note</td>
                <td>Mode/Terms of Payment<br/><b>${isQuotation ? "Against Approval" : "Cash / UPI"}</b></td>
              </tr>
              <tr>
                <td>Reference No. & Date</td>
                <td>Other References</td>
              </tr>
              <tr>
                <td>
                  Consignee (Ship to)<br/>
                  <b>${customerName || "Walk-in Customer"}</b><br/>
                  ${customerAddress || "-"}<br/>
                  GSTIN/UIN : ${customerGST || "-"}<br/>
                  Mobile : ${customerPhone || "-"}
                </td>
                <td>Buyer's Order No.</td>
                <td>Dated</td>
              </tr>
              <tr>
                <td>
                  Buyer (Bill to)<br/>
                  <b>${customerName || "Walk-in Customer"}</b><br/>
                  ${customerAddress || "-"}<br/>
                  GSTIN/UIN : ${customerGST || "-"}<br/>
                  Mobile : ${customerPhone || "-"}
                </td>
                <td colspan="2">
                  Terms of Delivery<br/>
                  ${isQuotation ? "Quotation valid for 7 days. Prices may change without notice." : category === "Restaurant" ? `Order: ${orderType}, Table: ${tableNumber || "-"}` : "-"}
                </td>
              </tr>
            </table>

            <table class="items-table">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Description of Goods</th>
                  <th>HSN/SAC</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>per</th>
                  <th>Disc. %</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceItems}
                <tr><td></td><td class="right bold">CGST</td><td></td><td></td><td></td><td></td><td></td><td class="right"><b>${cgst.toFixed(2)}</b></td></tr>
                <tr><td></td><td class="right bold">SGST</td><td></td><td></td><td></td><td></td><td></td><td class="right"><b>${sgst.toFixed(2)}</b></td></tr>
                <tr><td></td><td class="right bold">Discount</td><td></td><td></td><td></td><td></td><td></td><td class="right"><b>- ${discountAmount.toFixed(2)}</b></td></tr>
                <tr><td></td><td class="right bold">Total</td><td></td><td class="bold">${cart.reduce((a, b) => a + Number(b.qty), 0)}</td><td></td><td></td><td></td><td class="right big">₹ ${finalTotal.toFixed(2)}</td></tr>
              </tbody>
            </table>

            <table>
              <tr>
                <td colspan="2">Amount Chargeable (in words)<br/><b>Indian Rupees ${Math.round(finalTotal)} Only</b></td>
                <td class="right">E. & O.E</td>
              </tr>
            </table>

            <table>
              <tr>
                <th>HSN/SAC</th><th>Taxable Value</th><th>Central Tax Rate</th><th>Central Tax Amount</th><th>State Tax Rate</th><th>State Tax Amount</th><th>Total Tax Amount</th>
              </tr>
              <tr>
                <td>0000</td><td>${subtotal.toFixed(2)}</td><td>9%</td><td>${cgst.toFixed(2)}</td><td>9%</td><td>${sgst.toFixed(2)}</td><td>${gst.toFixed(2)}</td>
              </tr>
              <tr>
                <td class="bold">Total</td><td class="bold">${subtotal.toFixed(2)}</td><td></td><td class="bold">${cgst.toFixed(2)}</td><td></td><td class="bold">${sgst.toFixed(2)}</td><td class="bold">${gst.toFixed(2)}</td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  <b>Bank Details</b><br/>
                  Bank Name : ${user.bankName || "-"}<br/>
                  A/C No : ${user.accountNumber || "-"}<br/>
                  IFSC : ${user.ifscCode || "-"}<br/>
                  UPI : ${upiId || "-"}
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  Tax Amount (in words) : <b>Indian Rupees ${Math.round(gst)} Only</b><br/><br/>
                  <b>${isQuotation ? "Note" : "Declaration"}</b><br/>
                  ${isQuotation ? "This is only a quotation / estimate. It is not a tax invoice and does not confirm sale or stock deduction." : "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct."}
                </td>
                <td class="right" style="width:35%;">
                  for <b>${user.shopName}</b>
                  <div class="stamp-box">
                    ${user.stampUrl ? `<img src="${user.stampUrl}" style="max-width:150px;max-height:65px;" />` : "SHOP STAMP"}
                  </div>
                  Authorised Signatory
                </td>
              </tr>
            </table>

            <div class="footer">This is a Computer Generated ${isQuotation ? "Quotation" : "Invoice"}</div>
          </div>
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  const printInvoice = () => {
    printTallyDocument("Invoice");
  };

  const printQuotation = () => {
    if (cart.length === 0) {
      alert("Cart empty ❌");
      return;
    }

    printTallyDocument("Quotation");
  };

  const printKOT = () => {
    if (cart.length === 0) {
      alert("Cart empty ❌");
      return;
    }

    const kotItems = cart
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td align="right">${item.qty}</td>
        </tr>
      `
      )
      .join("");

    const win = window.open("", "", "width=350,height=700");

    win.document.write(`
      <html>
        <head>
          <title>Kitchen Order Ticket</title>
          <style>
            body{font-family: monospace;width:280px;padding:10px;}
            h2,p{text-align:center;margin:4px 0;}
            table{width:100%;border-collapse:collapse;margin-top:10px;}
            td{padding:6px 0;font-size:16px;}
            .line{border-top:1px dashed black;margin:8px 0;}
            .big{font-size:18px;font-weight:bold;}
          </style>
        </head>
        <body>
          <h2>KOT</h2>
          <p>${user.shopName}</p>
          <div class="line"></div>
          <p class="big">Order: ${orderType}</p>
          <p class="big">Table: ${tableNumber || "-"}</p>
          <p>Date: ${new Date().toLocaleString()}</p>
          <div class="line"></div>
          <table>${kotItems}</table>
          <div class="line"></div>
          <p>Send To Kitchen</p>
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
${category === "Restaurant" ? `Order Type: ${orderType}
Table: ${tableNumber || "-"}` : ""}
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

      const invoiceItems = cart.map((item) => ({
        productId: item._id,
        productName: item.name,
        barcode: item.barcode,
        hsnCode: item.hsnCode || item.hsn || "0000",
        hsn: item.hsnCode || item.hsn || "0000",
        price: Number(item.price),
        costPrice: Number(item.costPrice || 0),
        quantity: Number(item.qty),
        total: Number(item.price) * Number(item.qty),
        profit:
          (Number(item.price) - Number(item.costPrice || 0)) *
          Number(item.qty),
        unit: item.unit || "pcs",
        unitValue: item.unitValue || 1,
      }));

      const res = await fetch("https://clothpro.onrender.com/api/invoice/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: user.shopId,
          shopName: user.shopName,
          businessCategory: category,

          customerName: customerName || "Walk-in",
          customerPhone,
          customerAddress,
          customerGST,

          orderType: category === "Restaurant" ? orderType : "",
          tableNumber: category === "Restaurant" ? tableNumber : "",

          items: invoiceItems,

          subtotal,
          gst,
          discount: discountAmount,
          finalTotal,
          total: finalTotal,
          quantity: cart.reduce(
            (a, b) => a + Number(b.qty),
            0
          ),
          productName: cart.map((i) => i.name).join(", "),
          profit: cart.reduce(
            (a, b) =>
              a +
              (Number(b.price) - Number(b.costPrice || 0)) *
                Number(b.qty),
            0
          ),

          paymentMode: upiId ? "UPI/Cash" : "Cash",
          paymentStatus: "Paid",
          upiId,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Invoice Error ❌");
        return;
      }

     
printThermalBill({
  user,
  cart,
  customerName,
  customerPhone,
  customerAddress,
  customerGST,
  subtotal,
  gst,
  discountAmount,
  finalTotal,
  qrImage,
  upiId,
  orderType,
  tableNumber,
  category,
});
      setCart([]);
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
      setCustomerGST("");
      setDiscount(0);
      setOrderType("Dine-in");
      setTableNumber("");

      fetchProducts();
      fetchSales();

      alert(`Single Invoice Created ✅
${data.invoice?.invoiceNumber || ""}`);
    } catch (error) {
      console.log(error);
      alert("Invoice Save Error ❌");
    }
  };

  const updateUpiId = async () => {
    try {
      const newUpi = prompt("Enter New UPI ID", user?.upiId || "");
      if (!newUpi) return;

      const response = await fetch(
        `https://clothpro.onrender.com/api/auth/update-upi/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ upiId: newUpi }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("clothUser", JSON.stringify(data.user));
        setUser(data.user);
        alert("UPI Updated ✅");
      } else {
        alert(data.message || "UPI Update Failed ❌");
      }
    } catch (error) {
      console.log(error);
      alert("UPI Update Failed ❌");
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
    settings: "Payment Settings",
    staff: "Staff Management",
  };

  const hasPermission = (menu) => {
    if (!user?.isStaff) return true;
    return Boolean(user?.permissions?.[menu]);
  };

  const allowedMenus = [
    "dashboard",
    "inventory",
    "analytics",
    "billing",
    "khata",
    "supplier",
    "settings",
    "staff",
  ].filter((menu) => {
    if (menu === "staff") return !user?.isStaff;
    return hasPermission(menu);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      <div className="w-full lg:w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
        <h1 className="text-3xl font-bold mb-3">
          {ui.icon} {ui.appName}
        </h1>
        <p className="text-slate-400 mb-1">{user.shopName}</p>
        <p className="text-cyan-400 mb-1 text-sm">{category}</p>
        {user?.isStaff && (
          <p className="text-yellow-300 mb-6 text-sm">
            Staff: {user.name} ({user.role})
          </p>
        )}
        {!user?.isStaff && <p className="text-slate-500 mb-6 text-sm">Owner Access</p>}

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:space-y-0">
          {allowedMenus.map(
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

        {activeMenu === "dashboard" && hasPermission("dashboard") && (
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

        {activeMenu === "inventory" && hasPermission("inventory") && (
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
                <input
                  className="bg-slate-900 p-4 rounded-2xl"
                  placeholder="HSN / SAC Code"
                  value={hsnCode}
                  onChange={(e) => setHsnCode(e.target.value)}
                />

                {renderCategoryFields()}

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
                      <th className="p-4 text-left">Details</th>
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
                          <td className="p-4">
                            {item.quantity} {item.unit || "pcs"}
                          </td>
                          <td className="p-4 text-sm text-slate-300 max-w-xs">
                            {getProductDetails(item)}
                          </td>
                          <td className="p-4">
                            {getExpiryStatus(item) ? (
                              <span className={`${getExpiryStatus(item).className} px-3 py-1 rounded-xl`}>
                                {getExpiryStatus(item).label}
                              </span>
                            ) : Number(item.quantity) <= 2 ? (
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

        {activeMenu === "analytics" && hasPermission("analytics") && (
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

        {activeMenu === "billing" && hasPermission("billing") && (
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
                  placeholder="Customer Phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
                <input
                  className="w-full bg-slate-900 p-4 rounded-2xl mb-6"
                  placeholder="Customer Address"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
                <input
                  className="w-full bg-slate-900 p-4 rounded-2xl mb-6"
                  placeholder="Customer GSTIN (optional)"
                  value={customerGST}
                  onChange={(e) => setCustomerGST(e.target.value)}
                />
                <input
                  className="w-full bg-slate-900 p-4 rounded-2xl mb-6"
                  placeholder="Discount Amount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />

                {category === "Restaurant" && (
                  <div className="bg-slate-900 p-5 rounded-3xl mb-6 border border-orange-500/30">
                    <h3 className="text-2xl font-bold mb-4">🍽 Restaurant Order Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        className="bg-slate-800 p-4 rounded-2xl"
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                      >
                        <option>Dine-in</option>
                        <option>Takeaway</option>
                        <option>Delivery</option>
                      </select>

                      <input
                        className="bg-slate-800 p-4 rounded-2xl"
                        placeholder="Table Number"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                      />
                    </div>
                  </div>
                )}

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
                          <input
                            type="number"
                            step={category === "Grocery" ? "0.01" : "1"}
                            min="0.01"
                            className="bg-slate-800 w-24 p-3 rounded-xl text-center text-xl font-bold"
                            value={item.qty}
                            onChange={(e) => updateCartQty(item._id, e.target.value)}
                          />

                          <span className="text-slate-400 text-sm">
                            {item.unit || "pcs"}
                          </span>
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

                {category === "Restaurant" && (
                  <div className="mb-6 bg-orange-500/10 border border-orange-500/30 p-4 rounded-2xl">
                    <div className="flex justify-between text-lg mb-2">
                      <span>Order Type</span>
                      <span className="font-bold">{orderType}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Table</span>
                      <span className="font-bold">{tableNumber || "-"}</span>
                    </div>
                  </div>
                )}

                {!upiId && finalTotal > 0 && (
                  <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 p-5 rounded-3xl text-center">
                    <p className="text-yellow-300 font-bold text-lg">
                      Add your UPI ID in Payment Settings to show QR code.
                    </p>
                  </div>
                )}

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

                {category === "Restaurant" && (
                  <button
                    onClick={printKOT}
                    className="w-full mt-10 bg-orange-500 hover:bg-orange-600 p-4 rounded-2xl text-xl font-bold"
                  >
                    🍽 Print KOT
                  </button>
                )}

                {(category === "Mobile Shop" || category === "Electronics") && (
                  <button
                    onClick={printQuotation}
                    className="w-full mt-4 bg-purple-500 hover:bg-purple-600 p-4 rounded-2xl text-xl font-bold"
                  >
                    <FaPrint className="inline mr-2" />
                    Print Quotation
                  </button>
                )}
<button
  onClick={() =>
    printThermalBill({
      user,
      cart,
      customerName,
      customerPhone,
      customerAddress,
      customerGST,
      subtotal,
      gst,
      discountAmount,
      finalTotal,
      qrImage,
      upiId,
      orderType,
      tableNumber,
      category,
    })
  }
  className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 p-4 rounded-2xl text-xl font-bold"
>
  🖨️ Print Thermal Bill
</button>

                <button
                  onClick={saveSale}
                  className={`${category === "Restaurant" ? "mt-4" : "mt-10"} w-full bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl text-xl font-bold`}
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

        {activeMenu === "khata" && hasPermission("khata") && <CustomerKhata user={user} />}
        {activeMenu === "supplier" && hasPermission("supplier") && (
          <SupplierManagement user={user} />
        )}

        {activeMenu === "staff" && !user?.isStaff && <StaffManagement user={user} />}

        {activeMenu === "settings" && hasPermission("settings") && (
          <BusinessSettings user={user} setUser={setUser} />
        )}
      </div>
    </div>
  );
}

export default App;

export const printThermalBill = (data) => {

const {
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
} = data;

const win = window.open("", "", "width=320,height=900");

const items = cart.map((item,index)=>`
<tr>
<td>${index+1}</td>
<td>${item.name}</td>
<td>${item.qty}</td>
<td>₹${item.price}</td>
<td>₹${(item.qty*item.price).toFixed(2)}</td>
</tr>
`).join("");

win.document.write(`
<html>

<head>

<title>Thermal Bill</title>

<style>

body{
width:80mm;
font-family:monospace;
padding:8px;
font-size:12px;
}

table{
width:100%;
border-collapse:collapse;
}

td{
padding:3px 0;
}

.center{
text-align:center;
}

.right{
text-align:right;
}

hr{
border:none;
border-top:1px dashed #000;
margin:6px 0;
}

</style>

<body>
`);
<div class="center">

${user.logoUrl ? `<img src="${user.logoUrl}" style="width:70px;height:70px;"><br>` : ""}

<h2>${user.shopName}</h2>

<div>${user.businessAddress || ""}</div>

<div>📞 ${user.businessMobile || ""}</div>

<div>GST : ${user.gstNumber || "-"}</div>

</div>

<hr>

<div><b>Customer :</b> ${customerName || "Walk-in Customer"}</div>

<div><b>Phone :</b> ${customerPhone || "-"}</div>

<div><b>GST :</b> ${customerGST || "-"}</div>

<div><b>Date :</b> ${new Date().toLocaleString()}</div>

${category==="Restaurant" ? `
<div><b>Order :</b> ${orderType}</div>
<div><b>Table :</b> ${tableNumber || "-"}</div>
` : ""}

<hr>

<table>

<tr>
<th>#</th>
<th>Item</th>
<th>Qty</th>
<th>Rate</th>
<th>Total</th>
</tr>

${items}

</table>

<hr>
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

  const items = cart
    .map(
      (item, index) => `
<tr>
<td>${index + 1}</td>
<td>${item.name}</td>
<td>${item.qty}</td>
<td>₹${Number(item.price).toFixed(2)}</td>
<td class="right">₹${(
        Number(item.qty) * Number(item.price)
      ).toFixed(2)}</td>
</tr>
`
    )
    .join("");

  win.document.write(`
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>Thermal Bill</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
width:80mm;
font-family:monospace;
font-size:12px;
padding:8px;
color:#000;
background:#fff;
}

.center{
text-align:center;
}

.right{
text-align:right;
}

.bold{
font-weight:bold;
}

table{
width:100%;
border-collapse:collapse;
margin-top:4px;
}

th,
td{
padding:3px 0;
font-size:12px;
}

hr{
border:none;
border-top:1px dashed #000;
margin:6px 0;
}

.logo{
width:70px;
height:70px;
object-fit:contain;
margin:auto;
display:block;
}

.big{
font-size:16px;
font-weight:bold;
}

.small{
font-size:10px;
}

.total{
font-size:16px;
font-weight:bold;
}

</style>

</head>

<body>

<div class="center">

${
  user.logoUrl
    ? `<img src="${user.logoUrl}" class="logo">`
    : ""
}

<div class="big">${user.shopName}</div>

<div>${user.businessAddress || ""}</div>

<div>📞 ${user.businessMobile || ""}</div>

<div>GST : ${user.gstNumber || "-"}</div>

</div>

<hr>

<div><b>Customer :</b> ${customerName || "Walk-in Customer"}</div>

<div><b>Phone :</b> ${customerPhone || "-"}</div>

<div><b>Address :</b> ${customerAddress || "-"}</div>

<div><b>GST :</b> ${customerGST || "-"}</div>

<div><b>Date :</b> ${new Date().toLocaleString()}</div>
${category === "Restaurant" ? `
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

<table>

<tr>
<td>Subtotal</td>
<td class="right">₹${subtotal.toFixed(2)}</td>
</tr>

<tr>
<td>GST (18%)</td>
<td class="right">₹${gst.toFixed(2)}</td>
</tr>

<tr>
<td>Discount</td>
<td class="right">-₹${discountAmount.toFixed(2)}</td>
</tr>

<tr>

<td class="total">Grand Total</td>

<td class="right total">
₹${finalTotal.toFixed(2)}
</td>

</tr>

</table>

<hr>

<div class="center">

<b>Payment</b>

</div>
${qrImage ? `
<hr>

<div class="center">

<img
src="${qrImage}"
style="width:140px;height:140px;"
/>

<div style="margin-top:5px;font-weight:bold;">
Scan & Pay
</div>

<div>
${upiId || ""}
</div>

</div>

` : ""}

<hr>

<div class="center">

<div class="big">
THANK YOU 🙏
</div>

<div>
Visit Again
</div>

<br>

<div class="small">
Powered By SmartBiz OS
</div>

</div>

</body>

</html>

`);

win.document.close();

win.focus();

win.print();

setTimeout(() => {
  win.close();
}, 500);

};
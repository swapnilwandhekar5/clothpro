export const printThermalBill = (data) => {
  const {
    user,
    cart,
    customerName,
    customerPhone,
    customerAddress,
    customerGST,
    subtotal,
    discountAmount,
    finalTotal,
    qrImage,
    upiId,
    orderType,
    tableNumber,
    category,
  } = data;

  const win = window.open("", "_blank", "width=420,height=900");

  const items = cart
    .map(
      (item, index) => `
<tr>
<td>${index + 1}</td>
<td>${item.name}</td>
<td style="text-align:center;">${item.qty}</td>
<td style="text-align:right;">₹${Number(item.price).toFixed(2)}</td>
<td style="text-align:right;">₹${(
        Number(item.qty) * Number(item.price)
      ).toFixed(2)}</td>
</tr>`
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

@page{
size:80mm auto;
margin:0;
}

html{
width:80mm;
margin:0;
padding:0;
background:white;
}

body{
width:80mm;
margin:0 auto;
padding:0;
display:flex;
justify-content:center;
font-family:monospace;
background:white;
}

.bill{
width:76mm;
padding:6px;
color:#000;
font-size:11px;
}

.center{
text-align:center;
}

.right{
text-align:right;
}

.logo{
width:60px;
height:60px;
object-fit:contain;
display:block;
margin:auto;
margin-bottom:5px;
}

.shop{
font-size:17px;
font-weight:bold;
}

.small{
font-size:10px;
}

table{
width:100%;
border-collapse:collapse;
table-layout:fixed;
}

th,td{
padding:3px;
font-size:11px;
word-break:break-word;
}

th{
border-bottom:1px dashed #000;
}

hr{
border:none;
border-top:1px dashed #000;
margin:6px 0;
}

.total{
font-size:15px;
font-weight:bold;
}

.qr{
width:130px;
height:130px;
margin:auto;
display:block;
}

</style>

</head>

<body>

<div class="bill">

<div class="center">

${
  user.logoUrl
    ? `<img src="${user.logoUrl}" class="logo"/>`
    : ""
}

<div class="shop">${user.shopName || ""}</div>

<div>${user.businessAddress || ""}</div>

<div>${user.businessMobile || ""}</div>

${
  user.businessEmail
    ? `<div>${user.businessEmail}</div>`
    : ""
}

${
  user.gstNumber
    ? `<div>GSTIN : ${user.gstNumber}</div>`
    : ""
}

</div>

<hr>

<div><b>Customer :</b> ${customerName || "Walk-in Customer"}</div>

<div><b>Phone :</b> ${customerPhone || "-"}</div>

<div><b>Address :</b> ${customerAddress || "-"}</div>

${
customerGST
? `<div><b>GST :</b> ${customerGST}</div>`
: ""
}

<div><b>Date :</b> ${new Date().toLocaleString()}</div>

${
category==="Restaurant"
?`
<div><b>Order :</b> ${orderType}</div>
<div><b>Table :</b> ${tableNumber||"-"}</div>
`
:""
}

<hr>

<table>

<thead>

<tr>

<th>#</th>
<th>Item</th>
<th>Qty</th>
<th>Rate</th>
<th>Amt</th>

</tr>

</thead>

<tbody>

${items}

</tbody>

</table>

<hr>

<table>

<tr>

<td>Subtotal</td>

<td class="right">
₹${Number(subtotal).toFixed(2)}
</td>

</tr>

<tr>

<td>Discount</td>

<td class="right">
-₹${Number(discountAmount).toFixed(2)}
</td>

</tr>

<tr>

<td class="total">TOTAL</td>

<td class="right total">
₹${Number(finalTotal).toFixed(2)}
</td>

</tr>

</table>

${
qrImage
?`

<hr>

<div class="center">

<img src="${qrImage}" class="qr"/>

<div style="margin-top:5px;font-weight:bold;">
Scan & Pay
</div>

<div>${upiId||""}</div>

</div>

`
:""
}

<hr>

<div class="center">

<div style="font-size:16px;font-weight:bold;">
THANK YOU
</div>

<div>Visit Again</div>

<br>

<div class="small">
Powered By SmartBiz OS
</div>

</div>

</div>

<script>

window.onload=function(){

window.print();

setTimeout(function(){

window.close();

},500);

}

</script>

</body>
</html>
`);

  win.document.close();
};

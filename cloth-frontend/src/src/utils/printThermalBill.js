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
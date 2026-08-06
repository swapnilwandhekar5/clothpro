export const printInvoice = ({
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
}) => {

  const win = window.open("", "_blank");

  win.document.write(`
  <html>
  <head>
  <title>GST Invoice</title>

  <style>
  body{
    font-family:Arial;
    padding:20px;
  }

  table{
    width:100%;
    border-collapse:collapse;
    margin-top:15px;
  }

  table,th,td{
    border:1px solid black;
  }

  th,td{
    padding:8px;
    text-align:center;
  }

  </style>

  </head>

  <body>

  <h2>${user.shopName}</h2>

  <p>${user.businessAddress || ""}</p>

  <p>Phone : ${user.businessMobile || ""}</p>

  <p>GST : ${user.gstNumber || ""}</p>

  <hr>

  <h2>TAX INVOICE</h2>

  <p>Customer : ${customerName}</p>

  <p>Phone : ${customerPhone}</p>

  <p>Address : ${customerAddress}</p>

  <p>GSTIN : ${customerGST || "-"}</p>

  <table>

  <tr>
  <th>Product</th>
  <th>Qty</th>
  <th>Price</th>
  <th>Total</th>
  </tr>

  ${cart.map(item=>`
  <tr>
  <td>${item.name}</td>
  <td>${item.qty}</td>
  <td>${item.price}</td>
  <td>${item.qty*item.price}</td>
  </tr>
  `).join("")}

  </table>

  <br>

  <h3>Subtotal : ₹${subtotal}</h3>

  <h3>GST : ₹${gst.toFixed(2)}</h3>

  <h3>Discount : ₹${discountAmount}</h3>

  <h2>Grand Total : ₹${finalTotal.toFixed(2)}</h2>

  <script>
  window.print();
  window.close();
  </script>

  </body>
  </html>
  `);

  win.document.close();

};

import React, { useRef } from "react";
import "./thermal.css";

const ThermalBill = ({
  business = {},
  cart = [],
  customer = {},
  invoiceNo = "",
  paymentMode = "Cash",
  discount = 0,
  total = 0,
}) => {
  const printRef = useRef();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const printBill = () => {
    const content = printRef.current.innerHTML;

    const win = window.open("", "", "width=350,height=700");

    win.document.write(`
      <html>
      <head>
      <title>Thermal Bill</title>

      <style>

      body{
        width:80mm;
        margin:auto;
        font-family:Arial,sans-serif;
        font-size:12px;
      }

      h2{
        text-align:center;
        margin:2px;
      }

      table{
        width:100%;
        border-collapse:collapse;
      }

      th{
        border-top:1px dashed #000;
        border-bottom:1px dashed #000;
        text-align:left;
        padding:3px;
      }

      td{
        padding:2px;
      }

      .center{
        text-align:center;
      }

      .right{
        text-align:right;
      }

      .line{
        border-top:1px dashed #000;
        margin:5px 0;
      }

      </style>

      </head>

      <body>

      ${content}

      <script>
      window.onload=function(){
      window.print();
      window.close();
      }
      </script>

      </body>

      </html>
    `);

    win.document.close();
  };

  return (
    <>
      <button
        onClick={printBill}
        style={{
          background: "#2196f3",
          color: "#fff",
          padding: "10px 18px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        🖨 Print Thermal Bill
      </button>

      <div ref={printRef}>

        <div className="center">

          {business.logo && (
            <img
              src={business.logo}
              alt="logo"
              style={{
                width: 60,
                height: 60,
                objectFit: "contain",
              }}
            />
          )}

          <h2>{business.shopName || "SMARTBIZ ERP"}</h2>

          <div>{business.address}</div>

          <div>Mobile : {business.mobile}</div>

        </div>

        <div className="line"></div>

        <table>

          <tbody>

            <tr>
              <td>Bill No</td>
              <td className="right">{invoiceNo}</td>
            </tr>

            <tr>
              <td>Date</td>
              <td className="right">
                {new Date().toLocaleDateString()}
              </td>
            </tr>

            <tr>
              <td>Time</td>
              <td className="right">
                {new Date().toLocaleTimeString()}
              </td>
            </tr>

            {customer?.name && (
              <tr>
                <td>Customer</td>
                <td className="right">
                  {customer.name}
                </td>
              </tr>
            )}

            {customer?.mobile && (
              <tr>
                <td>Mobile</td>
                <td className="right">
                  {customer.mobile}
                </td>
              </tr>
            )}

          </tbody>

        </table>

        <div className="line"></div>

        <table>

          <thead>

            <tr>

              <th>Item</th>

              <th>Qty</th>

              <th>Rate</th>

              <th>Amt</th>

            </tr>

          </thead>

          <tbody>

            {cart.map((item, index) => (

              <tr key={index}>

                <td>{item.name}</td>

                <td className="center">
                  {item.quantity}
                </td>

                <td className="right">
                  ₹{item.price}
                </td>

                <td className="right">
                  ₹{item.price * item.quantity}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="line"></div>
        <table>

          <tbody>

            <tr>

              <td>Total Items</td>

              <td className="right">
                {cart.reduce(
                  (sum, item) => sum + Number(item.quantity),
                  0
                )}
              </td>

            </tr>

            <tr>

              <td>Subtotal</td>

              <td className="right">
                ₹{subtotal}
              </td>

            </tr>

            <tr>

              <td>Discount</td>

              <td className="right">
                ₹{discount}
              </td>

            </tr>

            <tr>

              <td>

                <strong>Grand Total</strong>

              </td>

              <td className="right">

                <strong>

                  ₹{total}

                </strong>

              </td>

            </tr>

            <tr>

              <td>Payment</td>

              <td className="right">
                {paymentMode}
              </td>

            </tr>

          </tbody>

        </table>

        <div className="line"></div>

        <div
          className="center"
          style={{
            fontWeight: "bold",
            marginTop: 8,
          }}
        >
          Thank You!
        </div>

        <div
          className="center"
          style={{
            fontSize: 11,
          }}
        >
          Visit Again
        </div>

        <br />

        <div
          className="center"
          style={{
            fontSize: 10,
          }}
        >
          Exchange within 7 Days
        </div>

        <div
          className="center"
          style={{
            fontSize: 10,
          }}
        >
          Goods once sold will not
          be taken back.
        </div>

        <br />

        <div
          className="center"
          style={{
            fontSize: 10,
          }}
        >
          Powered By SmartBiz ERP
        </div>
      </div>
    </>
  );
};

export default ThermalBill;
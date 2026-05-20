import { useEffect, useState } from "react";

function CustomerKhata({ user }) {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const fetchCustomers = async () => {
    const res = await fetch(
      `https://clothpro.onrender.com/api/customer/all/${user.shopId}`
    );
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async () => {
    if (!customerName || !phone) {
      alert("Customer name and phone required");
      return;
    }

    await fetch("https://clothpro.onrender.com/api/customer/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shopId: user.shopId,
        shopName: user.shopName,
        customerName,
        phone,
        notes,
      }),
    });

    setCustomerName("");
    setPhone("");
    setNotes("");
    fetchCustomers();
    alert("Customer Added ✅");
  };

  const addCredit = async (id) => {
    const amount = prompt("Credit amount");
    const description = prompt("Description");

    if (!amount) return;

    await fetch(`https://clothpro.onrender.com/api/customer/credit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        description: description || "Credit added",
      }),
    });

    fetchCustomers();
  };

  const addPayment = async (id) => {
    const amount = prompt("Payment amount");
    const description = prompt("Description");

    if (!amount) return;

    await fetch(`https://clothpro.onrender.com/api/customer/payment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        description: description || "Payment received",
      }),
    });

    fetchCustomers();
  };

  const deleteCustomer = async (id) => {
    await fetch(`https://clothpro.onrender.com/api/customer/delete/${id}`, {
      method: "DELETE",
    });

    fetchCustomers();
  };

  const sendReminder = (customer) => {
    const message = `
Namaste ${customer.customerName} ji,

Aapka pending balance Rs ${customer.balance} hai.

Please payment complete kare.

Thank you,
${user.shopName}
Powered By ClothPro
`;

    window.open(
      `https://wa.me/91${customer.phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white/5 rounded-3xl p-6 lg:p-8">
      <h2 className="text-4xl font-bold mb-8">📒 Customer Credit Khata</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <input
          className="bg-slate-900 p-4 rounded-2xl"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          className="bg-slate-900 p-4 rounded-2xl"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="bg-slate-900 p-4 rounded-2xl"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          onClick={addCustomer}
          className="bg-blue-500 p-4 rounded-2xl font-bold"
        >
          Add Customer
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Credit</th>
              <th className="p-4 text-left">Paid</th>
              <th className="p-4 text-left">Balance</th>
              <th className="p-4 text-left">Notes</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id} className="border-b border-white/5">
                <td className="p-4">{customer.customerName}</td>
                <td className="p-4">{customer.phone}</td>
                <td className="p-4">Rs {customer.totalCredit}</td>
                <td className="p-4">Rs {customer.totalPaid}</td>
                <td className="p-4 font-bold text-yellow-300">
                  Rs {customer.balance}
                </td>
                <td className="p-4">{customer.notes || "-"}</td>

                <td className="p-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => addCredit(customer._id)}
                    className="bg-orange-500 px-4 py-2 rounded-xl"
                  >
                    Credit
                  </button>

                  <button
                    onClick={() => addPayment(customer._id)}
                    className="bg-green-500 px-4 py-2 rounded-xl"
                  >
                    Payment
                  </button>

                  <button
                    onClick={() => sendReminder(customer)}
                    className="bg-emerald-600 px-4 py-2 rounded-xl"
                  >
                    WhatsApp
                  </button>

                  <button
                    onClick={() => deleteCustomer(customer._id)}
                    className="bg-red-500 px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerKhata;
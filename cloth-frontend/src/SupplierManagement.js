import { useEffect, useState } from "react";

function SupplierManagement({ user }) {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierName, setSupplierName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const fetchSuppliers = async () => {
    const res = await fetch(
      `https://clothpro.onrender.com/api/supplier/all/${user.shopId}`
    );

    const data = await res.json();
    setSuppliers(data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const addSupplier = async () => {
    if (!supplierName || !phone) {
      alert("Supplier name and phone required");
      return;
    }

    await fetch("https://clothpro.onrender.com/api/supplier/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shopId: user.shopId,
        shopName: user.shopName,
        supplierName,
        phone,
        address,
        notes,
      }),
    });

    setSupplierName("");
    setPhone("");
    setAddress("");
    setNotes("");

    fetchSuppliers();
    alert("Supplier Added ✅");
  };

  const addPurchase = async (id) => {
    const amount = prompt("Purchase amount");
    const description = prompt("Description");

    if (!amount) return;

    await fetch(`https://clothpro.onrender.com/api/supplier/purchase/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        description: description || "Purchase added",
      }),
    });

    fetchSuppliers();
  };

  const addPayment = async (id) => {
    const amount = prompt("Payment amount");
    const description = prompt("Description");

    if (!amount) return;

    await fetch(`https://clothpro.onrender.com/api/supplier/payment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        description: description || "Payment paid",
      }),
    });

    fetchSuppliers();
  };

  const deleteSupplier = async (id) => {
    await fetch(`https://clothpro.onrender.com/api/supplier/delete/${id}`, {
      method: "DELETE",
    });

    fetchSuppliers();
  };

  const sendReminder = (supplier) => {
    const message = `
Namaste ${supplier.supplierName} ji,

Aapka pending payment Rs ${supplier.balance} hai.

Hum jaldi payment update karenge.

Thank you,
${user.shopName}
Powered By ClothPro
`;

    window.open(
      `https://wa.me/91${supplier.phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white/5 rounded-3xl p-6 lg:p-8">
      <h2 className="text-4xl font-bold mb-8">🏭 Supplier Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        <input
          className="bg-slate-900 p-4 rounded-2xl"
          placeholder="Supplier Name"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />

        <input
          className="bg-slate-900 p-4 rounded-2xl"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="bg-slate-900 p-4 rounded-2xl"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="bg-slate-900 p-4 rounded-2xl"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          onClick={addSupplier}
          className="bg-blue-500 p-4 rounded-2xl font-bold"
        >
          Add Supplier
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">Supplier</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Purchase</th>
              <th className="p-4 text-left">Paid</th>
              <th className="p-4 text-left">Balance</th>
              <th className="p-4 text-left">Notes</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id} className="border-b border-white/5">
                <td className="p-4">{supplier.supplierName}</td>
                <td className="p-4">{supplier.phone}</td>
                <td className="p-4">{supplier.address || "-"}</td>
                <td className="p-4">Rs {supplier.totalPurchase}</td>
                <td className="p-4">Rs {supplier.totalPaid}</td>
                <td className="p-4 font-bold text-yellow-300">
                  Rs {supplier.balance}
                </td>
                <td className="p-4">{supplier.notes || "-"}</td>

                <td className="p-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => addPurchase(supplier._id)}
                    className="bg-orange-500 px-4 py-2 rounded-xl"
                  >
                    Purchase
                  </button>

                  <button
                    onClick={() => addPayment(supplier._id)}
                    className="bg-green-500 px-4 py-2 rounded-xl"
                  >
                    Payment
                  </button>

                  <button
                    onClick={() => sendReminder(supplier)}
                    className="bg-emerald-600 px-4 py-2 rounded-xl"
                  >
                    WhatsApp
                  </button>

                  <button
                    onClick={() => deleteSupplier(supplier._id)}
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

export default SupplierManagement;
import { useState } from "react";

function BusinessSettings({ user, setUser }) {
  const [form, setForm] = useState({
    shopName: user?.shopName || "",
    ownerName: user?.ownerName || "",
    businessCategory: user?.businessCategory || "Clothing",
    gstNumber: user?.gstNumber || "",
    businessAddress: user?.businessAddress || "",
    businessState: user?.businessState || "Maharashtra",
    stateCode: user?.stateCode || "27",
    businessMobile: user?.businessMobile || "",
    businessEmail: user?.businessEmail || "",
    logoUrl: user?.logoUrl || "",
    stampUrl: user?.stampUrl || "",
    bankName: user?.bankName || "",
    accountNumber: user?.accountNumber || "",
    ifscCode: user?.ifscCode || "",
    upiId: user?.upiId || "",
  });

  const API_URL = "https://clothpro.onrender.com";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateBusiness = async () => {
    try {
      if (!form.shopName || !form.ownerName) {
        alert("Shop name and owner name required");
        return;
      }

      const res = await fetch(
        `${API_URL}/api/auth/update-business/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Update failed");
        return;
      }

      localStorage.setItem("clothUser", JSON.stringify(data.user));
      setUser(data.user);
      alert("Business Details Updated ✅");
    } catch (error) {
      console.log(error);
      alert("Business Update Failed ❌");
    }
  };

  const inputClass = "bg-slate-900 p-4 rounded-2xl w-full outline-none";

  return (
    <div className="bg-white/5 rounded-3xl p-6 lg:p-8">
      <h2 className="text-4xl font-bold mb-2">🏢 Business Settings</h2>
      <p className="text-slate-400 mb-8">
        These details will appear automatically on invoices and quotations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <input
          className={inputClass}
          name="shopName"
          placeholder="Shop / Business Name"
          value={form.shopName}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="ownerName"
          placeholder="Owner Name"
          value={form.ownerName}
          onChange={handleChange}
        />

        <select
          className={inputClass}
          name="businessCategory"
          value={form.businessCategory}
          onChange={handleChange}
        >
          <option>Clothing</option>
          <option>Grocery</option>
          <option>Medical</option>
          <option>Restaurant</option>
          <option>Salon</option>
          <option>Mobile Shop</option>
          <option>Electronics</option>
          <option>Hardware</option>
          <option>Footwear</option>
          <option>Cosmetics</option>
          <option>General Store</option>
          <option>Other</option>
        </select>

        <input
          className={inputClass}
          name="gstNumber"
          placeholder="GST Number"
          value={form.gstNumber}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="businessMobile"
          placeholder="Business Mobile"
          value={form.businessMobile}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="businessEmail"
          placeholder="Business Email"
          value={form.businessEmail}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="businessState"
          placeholder="State"
          value={form.businessState}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="stateCode"
          placeholder="State Code"
          value={form.stateCode}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="upiId"
          placeholder="UPI ID"
          value={form.upiId}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="logoUrl"
          placeholder="Logo URL"
          value={form.logoUrl}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="stampUrl"
          placeholder="Stamp Image URL"
          value={form.stampUrl}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="bankName"
          placeholder="Bank Name"
          value={form.bankName}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="accountNumber"
          placeholder="Account Number"
          value={form.accountNumber}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          name="ifscCode"
          placeholder="IFSC Code"
          value={form.ifscCode}
          onChange={handleChange}
        />
      </div>

      <textarea
        className="bg-slate-900 p-4 rounded-2xl w-full mt-4 outline-none min-h-[110px]"
        name="businessAddress"
        placeholder="Business Address"
        value={form.businessAddress}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {form.logoUrl && (
          <div className="bg-slate-900 p-4 rounded-2xl">
            <p className="text-slate-400 mb-3">Logo Preview</p>
            <img
              src={form.logoUrl}
              alt="Business Logo"
              className="max-h-28 bg-white rounded-xl p-2"
            />
          </div>
        )}

        {form.stampUrl && (
          <div className="bg-slate-900 p-4 rounded-2xl">
            <p className="text-slate-400 mb-3">Stamp Preview</p>
            <img
              src={form.stampUrl}
              alt="Business Stamp"
              className="max-h-28 bg-white rounded-xl p-2"
            />
          </div>
        )}
      </div>

      <button
        onClick={updateBusiness}
        className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-2xl text-xl font-bold"
      >
        Save Business Details
      </button>
    </div>
  );
}

export default BusinessSettings;

import { useEffect, useState } from "react";

function AdminPanel() {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("clothAdmin"))
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [shops, setShops] = useState([]);

  const adminLogin = async () => {
    const res = await fetch("https://clothpro.onrender.com/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    alert(data.message);

    if (data.success) {
      localStorage.setItem("clothAdmin", JSON.stringify(data.admin));
      setAdmin(data.admin);
    }
  };

  const fetchShops = async () => {
    const res = await fetch("https://clothpro.onrender.com/api/admin/shops");
    const data = await res.json();
    setShops(data);
  };

  useEffect(() => {
    if (admin) {
      fetchShops();
    }
  }, [admin]);

  const toggleShop = async (id) => {
    await fetch(`https://clothpro.onrender.com/api/admin/toggle/${id}`, {
      method: "PUT",
    });

    fetchShops();
  };

  const updatePlan = async (id) => {
    const plan = prompt("Enter plan: free / paid / premium");
    const expiryDate = prompt("Enter expiry date: YYYY-MM-DD");

    if (!plan) return;

    await fetch(`https://clothpro.onrender.com/api/admin/plan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan,
        expiryDate,
      }),
    });

    fetchShops();
  };

  const logout = () => {
    localStorage.removeItem("clothAdmin");
    setAdmin(null);
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl w-[400px]">
          <h1 className="text-4xl font-bold mb-8 text-center">
            🔐 Admin Login
          </h1>

          <input
            className="w-full bg-slate-900 p-4 rounded-2xl mb-4 outline-none"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-slate-900 p-4 rounded-2xl mb-6 outline-none"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={adminLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl text-xl font-bold"
          >
            Login
          </button>

          <p className="text-slate-400 text-center mt-6 text-sm">
            admin@clothpro.com / admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 lg:p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">👑 Admin Dashboard</h1>
          <p className="text-slate-400 mt-2">Manage all shop accounts</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-6 py-3 rounded-2xl font-bold"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-3xl">
          <h2 className="text-xl">Total Shops</h2>
          <h1 className="text-5xl font-bold mt-3">{shops.length}</h1>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-emerald-400 p-6 rounded-3xl">
          <h2 className="text-xl">Active Shops</h2>
          <h1 className="text-5xl font-bold mt-3">
            {shops.filter((shop) => shop.isActive).length}
          </h1>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-pink-500 p-6 rounded-3xl">
          <h2 className="text-xl">Blocked Shops</h2>
          <h1 className="text-5xl font-bold mt-3">
            {shops.filter((shop) => !shop.isActive).length}
          </h1>
        </div>
      </div>

      <div className="bg-white/5 rounded-3xl p-6 overflow-x-auto">
        <h2 className="text-3xl font-bold mb-6">All Shops</h2>

        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">Shop</th>
              <th className="p-4 text-left">Owner</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Shop ID</th>
              <th className="p-4 text-left">Plan</th>
              <th className="p-4 text-left">Expiry</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {shops.map((shop) => (
              <tr key={shop._id} className="border-b border-white/5">
                <td className="p-4">{shop.shopName}</td>
                <td className="p-4">{shop.ownerName}</td>
                <td className="p-4">{shop.email}</td>
                <td className="p-4">{shop.shopId}</td>
                <td className="p-4 capitalize">{shop.plan || "free"}</td>

                <td className="p-4">
                  {shop.expiryDate
                    ? new Date(shop.expiryDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-4">
                  {shop.isActive ? (
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-xl">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-xl">
                      Blocked
                    </span>
                  )}
                </td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => toggleShop(shop._id)}
                    className={`px-4 py-2 rounded-xl font-bold ${
                      shop.isActive ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {shop.isActive ? "Block" : "Activate"}
                  </button>

                  <button
                    onClick={() => updatePlan(shop._id)}
                    className="bg-blue-500 px-4 py-2 rounded-xl font-bold"
                  >
                    Plan
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

export default AdminPanel;
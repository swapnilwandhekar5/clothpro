import { useEffect, useState } from "react";
import Login from "./Login";
import AdminPanel from "./AdminPanel";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("clothUser"))
  );

  useEffect(() => {}, []);

  // ADMIN PANEL ROUTE
  if (window.location.pathname === "/admin") {
    return <AdminPanel />;
  }

  // SHOP LOGIN
  if (!user) {
    return <Login setUser={setUser} />;
  }

  // SHOP DASHBOARD
  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
      <div className="bg-white/5 p-10 rounded-3xl text-center">
        <h1 className="text-5xl font-bold mb-4">
          👕 ClothPro Dashboard
        </h1>

        <p className="text-xl text-slate-300 mb-8">
          Welcome {user.ownerName}
        </p>

        <div className="space-y-4">
          <button className="w-full bg-blue-500 p-4 rounded-2xl">
            Inventory
          </button>

          <button className="w-full bg-green-500 p-4 rounded-2xl">
            Billing
          </button>

          <button className="w-full bg-purple-500 p-4 rounded-2xl">
            Analytics
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("clothUser");
              window.location.reload();
            }}
            className="w-full bg-red-500 p-4 rounded-2xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
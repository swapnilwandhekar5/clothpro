import { useState } from "react";

function Login({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);

  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("Clothing");
  const [upiId, setUpiId] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "https://clothpro.onrender.com";

  const submitHandler = async () => {
    try {
      if (!email || !password) {
        alert("Email and password required");
        return;
      }

      if (!isLogin && (!shopName || !ownerName)) {
        alert("Shop name and owner name required");
        return;
      }

      const url = isLogin
        ? `${API_URL}/api/auth/login`
        : `${API_URL}/api/auth/register`;

      const bodyData = isLogin
        ? { email, password }
        : {
            shopName,
            ownerName,
            businessCategory,
            upiId,
            email,
            password,
          };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      localStorage.setItem("clothUser", JSON.stringify(data.user));
      localStorage.setItem("clothToken", data.token || "");

      setUser(data.user);

      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Live backend not connected. Please wait and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-white text-4xl font-bold mb-8 text-center">
          {isLogin ? "🚀 SmartBiz Login" : "🚀 Create Business"}
        </h1>

        {!isLogin && (
          <>
            <input
              className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none"
              placeholder="Business / Shop Name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />

            <input
              className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none"
              placeholder="Owner Name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />

            <select
              className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none"
              value={businessCategory}
              onChange={(e) => setBusinessCategory(e.target.value)}
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
              className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none"
              placeholder="UPI ID (example: name@upi)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </>
        )}

        <input
          className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-6 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submitHandler}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl text-white text-xl font-bold hover:scale-105 transition"
        >
          {isLogin ? "Login" : "Register Business"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-center text-slate-400 mt-6 cursor-pointer hover:text-white transition"
        >
          {isLogin ? "Create New Business" : "Already have account?"}
        </p>
      </div>
    </div>
  );
}

export default Login;
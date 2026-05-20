import { useState } from "react";

function Login({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);

  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("Clothing");
  const [upiId, setUpiId] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [expired, setExpired] = useState(false);

  const submitHandler = async () => {
    try {
      const url = isLogin
        ? "https://clothpro.onrender.com/api/auth/login"
        : "https://clothpro.onrender.com/api/auth/register";

      const bodyData = isLogin
        ? {
            email,
            password,
          }
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

        if (data.message === "Subscription Expired") {
          setExpired(true);
        }

        return;
      }

      localStorage.setItem("clothUser", JSON.stringify(data.user));
      localStorage.setItem("clothToken", data.token);

      setUser(data.user);

      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }
  };

  if (expired) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
        <div className="bg-white/5 border border-red-500 p-10 rounded-3xl w-full max-w-md text-center text-white">
          <h1 className="text-5xl mb-6">🚫</h1>

          <h2 className="text-3xl font-bold mb-4">
            Subscription Expired
          </h2>

          <p className="text-slate-300 mb-8">
            Your subscription has expired. Please renew your plan to continue
            using the software.
          </p>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-green-500 hover:bg-green-600 p-4 rounded-2xl text-xl font-bold transition"
          >
            Renew on WhatsApp
          </a>

          <button
            onClick={() => setExpired(false)}
            className="mt-4 text-slate-400 hover:text-white"
          >
            Back To Login
          </button>
        </div>
      </div>
    );
  }

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
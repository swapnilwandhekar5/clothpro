import { useState } from "react";

function Login({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);

  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessCategory, setBusinessCategory] =
    useState("Clothing");

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

      if (!isLogin) {
        if (!shopName || !ownerName) {
          alert("Please fill all details");
          return;
        }
      }

      const url = isLogin
        ? `${API_URL}/api/auth/login`
        : `${API_URL}/api/auth/register`;

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

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      localStorage.setItem(
        "clothUser",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "clothToken",
        data.token || ""
      );

      setUser(data.user);

      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          🚀 {isLogin ? "Login" : "Create Business"}
        </h1>

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Business / Shop Name"
              value={shopName}
              onChange={(e) =>
                setShopName(e.target.value)
              }
              className="w-full p-4 mb-4 rounded-2xl bg-slate-900 text-white outline-none"
            />

            <input
              type="text"
              placeholder="Owner Name"
              value={ownerName}
              onChange={(e) =>
                setOwnerName(e.target.value)
              }
              className="w-full p-4 mb-4 rounded-2xl bg-slate-900 text-white outline-none"
            />

            <select
              value={businessCategory}
              onChange={(e) =>
                setBusinessCategory(e.target.value)
              }
              className="w-full p-4 mb-4 rounded-2xl bg-slate-900 text-white outline-none"
            >
              <option>Clothing</option>
              <option>Grocery</option>
              <option>Medical</option>
              <option>Restaurant</option>
              <option>Salon</option>
              <option>Electronics</option>
              <option>Mobile Shop</option>
              <option>Hardware</option>
              <option>Footwear</option>
              <option>General Store</option>
            </select>

            <input
              type="text"
              placeholder="UPI ID (example: swapnil@paytm)"
              value={upiId}
              onChange={(e) =>
                setUpiId(e.target.value)
              }
              className="w-full p-4 mb-4 rounded-2xl bg-slate-900 text-white outline-none"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 mb-4 rounded-2xl bg-slate-900 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 mb-6 rounded-2xl bg-slate-900 text-white outline-none"
        />

        <button
          onClick={submitHandler}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-2xl text-2xl font-bold"
        >
          {isLogin
            ? "Login"
            : "Register Business"}
        </button>

        <p
          className="text-center text-slate-400 mt-6 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Create New Business"
            : "Already have account?"}
        </p>
      </div>
    </div>
  );
}

export default Login;
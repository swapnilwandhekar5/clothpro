import { useState } from "react";

function Login({ setUser }) {
  const [isLogin, setIsLogin] =
    useState(true);

  const [shopName, setShopName] =
    useState("");

  const [ownerName, setOwnerName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submitHandler = async () => {
    try {
      const url = isLogin
        ? "hhttps://clothpro.onrender.com/api/auth/login"
        : "https://clothpro.onrender.com/api/auth/register";

      const bodyData = isLogin
        ? {
            email,
            password,
          }
        : {
            shopName,
            ownerName,
            email,
            password,
          };

      const res = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      alert(data.message);

      if (data.success) {
        localStorage.setItem(
          "clothUser",
          JSON.stringify(data.user)
        );

        localStorage.setItem(
          "clothToken",
          data.token
        );

        setUser(data.user);
      }
    } catch (error) {
      console.log(error);

      alert("Login Error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">
      <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl w-[400px] border border-white/10 shadow-2xl">
        <h1 className="text-white text-4xl font-bold mb-8 text-center">
          {isLogin
            ? "🏪 Shop Login"
            : "🚀 Create Shop"}
        </h1>

        {!isLogin && (
          <>
            <input
              className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none"
              placeholder="Shop Name"
              value={shopName}
              onChange={(e) =>
                setShopName(
                  e.target.value
                )
              }
            />

            <input
              className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none"
              placeholder="Owner Name"
              value={ownerName}
              onChange={(e) =>
                setOwnerName(
                  e.target.value
                )
              }
            />
          </>
        )}

        <input
          className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-6 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={submitHandler}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl text-white text-xl font-bold hover:scale-105 transition"
        >
          {isLogin
            ? "Login"
            : "Register"}
        </button>

        <p
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="text-center text-slate-400 mt-6 cursor-pointer hover:text-white transition"
        >
          {isLogin
            ? "Create New Shop"
            : "Already have account?"}
        </p>
      </div>
    </div>
  );
}

export default Login;
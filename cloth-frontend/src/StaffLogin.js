// cloth-frontend/src/StaffLogin.js

import { useState } from "react";

function StaffLogin({ setUser }) {
  const [isRegister, setIsRegister] =
    useState(false);

  const [shopId, setShopId] = useState("");
  const [shopName, setShopName] =
    useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("Sales Staff");

  const registerStaff = async () => {
    const res = await fetch(
      "https://clothpro.onrender.com/api/staff/register",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          shopId,
          shopName,
          name,
          mobile,
          email,
          password,
          role,
        }),
      }
    );

    const data = await res.json();

    alert(data.message);

    if (data.success) {
      setIsRegister(false);
    }
  };

  const loginStaff = async () => {
    const res = await fetch(
      "https://clothpro.onrender.com/api/staff/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    localStorage.setItem(
      "clothUser",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    alert("Login Success ✅");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
      <div className="bg-slate-900 p-10 rounded-3xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">
          👨‍💼 Staff Portal
        </h1>

        {isRegister && (
          <>
            <input
              className="w-full p-4 rounded-2xl bg-slate-800 mb-4"
              placeholder="Shop ID"
              value={shopId}
              onChange={(e) =>
                setShopId(e.target.value)
              }
            />

            <input
              className="w-full p-4 rounded-2xl bg-slate-800 mb-4"
              placeholder="Shop Name"
              value={shopName}
              onChange={(e) =>
                setShopName(e.target.value)
              }
            />

            <input
              className="w-full p-4 rounded-2xl bg-slate-800 mb-4"
              placeholder="Staff Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              className="w-full p-4 rounded-2xl bg-slate-800 mb-4"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value)
              }
            />

            <select
              className="w-full p-4 rounded-2xl bg-slate-800 mb-4"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option>Sales Staff</option>
              <option>Cashier</option>
              <option>Manager</option>
              <option>Billing Staff</option>
            </select>
          </>
        )}

        <input
          className="w-full p-4 rounded-2xl bg-slate-800 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full p-4 rounded-2xl bg-slate-800 mb-6"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {isRegister ? (
          <button
            onClick={registerStaff}
            className="w-full bg-green-500 p-4 rounded-2xl text-xl font-bold"
          >
            Register Staff
          </button>
        ) : (
          <button
            onClick={loginStaff}
            className="w-full bg-blue-500 p-4 rounded-2xl text-xl font-bold"
          >
            Staff Login
          </button>
        )}

        <button
          onClick={() =>
            setIsRegister(!isRegister)
          }
          className="w-full mt-4 bg-slate-700 p-4 rounded-2xl"
        >
          {isRegister
            ? "Already Registered? Login"
            : "New Staff? Register"}
        </button>
      </div>
    </div>
  );
}

export default StaffLogin;
import { useState } from "react";

function StaffLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginStaff = async () => {
    try {
      const res = await fetch(
        "https://clothpro.onrender.com/api/staff/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

      const staffUser = {
        ...data.staff,
        isStaff: true,
      };

      localStorage.setItem(
        "clothUser",
        JSON.stringify(staffUser)
      );

      setUser(staffUser);

      alert("Staff Login Success ✅");
    } catch (error) {
      console.log(error);
      alert("Login Error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-white text-4xl font-bold mb-8 text-center">
          👨‍💼 Staff Login
        </h1>

        <input
          className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none"
          placeholder="Staff Email"
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
          onClick={loginStaff}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl text-white text-xl font-bold hover:scale-105 transition"
        >
          Login Staff
        </button>

        <p className="text-center text-slate-400 mt-6">
          Staff access is controlled by owner permissions
        </p>
      </div>
    </div>
  );
}

export default StaffLogin;
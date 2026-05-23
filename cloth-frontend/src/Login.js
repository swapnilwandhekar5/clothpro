import { useState } from "react";

function Login({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);

  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessCategory, setBusinessCategory] =
    useState("Clothing");

  const [gstNumber, setGstNumber] = useState("");
  const [businessAddress, setBusinessAddress] =
    useState("");
  const [businessState, setBusinessState] =
    useState("Maharashtra");
  const [stateCode, setStateCode] = useState("27");
  const [businessMobile, setBusinessMobile] =
    useState("");
  const [businessEmail, setBusinessEmail] =
    useState("");

  const [logoUrl, setLogoUrl] = useState("");
  const [stampUrl, setStampUrl] = useState("");

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] =
    useState("");
  const [ifscCode, setIfscCode] = useState("");
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
        alert(
          "Shop name and owner name required"
        );
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
            gstNumber,
            businessAddress,
            businessState,
            stateCode,
            businessMobile,
            businessEmail,
            logoUrl,
            stampUrl,
            bankName,
            accountNumber,
            ifscCode,
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

  const inputClass =
    "w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none";

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-3xl shadow-2xl">
        <h1 className="text-white text-4xl font-bold mb-8 text-center">
          {isLogin
            ? "🚀 SmartBiz Login"
            : "🚀 Create Business"}
        </h1>

        {!isLogin && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className={inputClass}
                placeholder="Business / Shop Name"
                value={shopName}
                onChange={(e) =>
                  setShopName(e.target.value)
                }
              />

              <input
                className={inputClass}
                placeholder="Owner Name"
                value={ownerName}
                onChange={(e) =>
                  setOwnerName(e.target.value)
                }
              />

              <select
                className={inputClass}
                value={businessCategory}
                onChange={(e) =>
                  setBusinessCategory(
                    e.target.value
                  )
                }
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
                placeholder="GST Number"
                value={gstNumber}
                onChange={(e) =>
                  setGstNumber(e.target.value)
                }
              />

              <input
                className={inputClass}
                placeholder="Business Mobile"
                value={businessMobile}
                onChange={(e) =>
                  setBusinessMobile(
                    e.target.value
                  )
                }
              />

              <input
                className={inputClass}
                placeholder="Business Email"
                value={businessEmail}
                onChange={(e) =>
                  setBusinessEmail(
                    e.target.value
                  )
                }
              />

              <input
                className={inputClass}
                placeholder="Business State"
                value={businessState}
                onChange={(e) =>
                  setBusinessState(
                    e.target.value
                  )
                }
              />

              <input
                className={inputClass}
                placeholder="State Code"
                value={stateCode}
                onChange={(e) =>
                  setStateCode(e.target.value)
                }
              />
            </div>

            <textarea
              className="w-full p-4 rounded-2xl bg-slate-900 text-white mb-4 outline-none"
              placeholder="Business Address"
              value={businessAddress}
              onChange={(e) =>
                setBusinessAddress(
                  e.target.value
                )
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className={inputClass}
                placeholder="Logo URL"
                value={logoUrl}
                onChange={(e) =>
                  setLogoUrl(e.target.value)
                }
              />

              <input
                className={inputClass}
                placeholder="Stamp URL"
                value={stampUrl}
                onChange={(e) =>
                  setStampUrl(e.target.value)
                }
              />

              <input
                className={inputClass}
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) =>
                  setBankName(e.target.value)
                }
              />

              <input
                className={inputClass}
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(
                    e.target.value
                  )
                }
              />

              <input
                className={inputClass}
                placeholder="IFSC Code"
                value={ifscCode}
                onChange={(e) =>
                  setIfscCode(e.target.value)
                }
              />

              <input
                className={inputClass}
                placeholder="UPI ID"
                value={upiId}
                onChange={(e) =>
                  setUpiId(e.target.value)
                }
              />
            </div>
          </>
        )}

        <input
          className={inputClass}
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className={inputClass}
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={submitHandler}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl text-white text-xl font-bold"
        >
          {isLogin
            ? "Login"
            : "Register Business"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-center text-slate-400 mt-6 cursor-pointer hover:text-white transition"
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
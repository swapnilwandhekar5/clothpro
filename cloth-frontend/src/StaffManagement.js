import { useEffect, useState } from "react";

function StaffManagement({ user }) {
  const [staffList, setStaffList] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Cashier");
  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const fetchStaff = async () => {
    const res = await fetch(
      `https://clothpro.onrender.com/api/staff/all/${user.shopId}`
    );

    const data = await res.json();
    setStaffList(data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const addStaff = async () => {
    if (!name || !email || !password || !role) {
      alert("Name, email, password and role required");
      return;
    }

    const res = await fetch("https://clothpro.onrender.com/api/staff/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shopId: user.shopId,
        shopName: user.shopName,
        ownerId: user._id,

        name,
        email,
        password,
        phone,

        role,
        salary,
        joiningDate,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setRole("Cashier");
    setSalary("");
    setJoiningDate("");

    fetchStaff();
    alert("Staff Added ✅");
  };

  const toggleStaff = async (id) => {
    await fetch(`https://clothpro.onrender.com/api/staff/toggle/${id}`, {
      method: "PUT",
    });

    fetchStaff();
  };

  const deleteStaff = async (id) => {
    await fetch(`https://clothpro.onrender.com/api/staff/delete/${id}`, {
      method: "DELETE",
    });

    fetchStaff();
  };

  return (
    <div className="bg-white/5 rounded-3xl p-6 lg:p-8">
      <h2 className="text-4xl font-bold mb-8">👨‍💼 Staff Management</h2>

      <div className="bg-slate-900 p-6 rounded-3xl mb-10">
        <h3 className="text-2xl font-bold mb-6">Add Staff</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="bg-slate-800 p-4 rounded-2xl"
            placeholder="Staff Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="bg-slate-800 p-4 rounded-2xl"
            placeholder="Staff Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="bg-slate-800 p-4 rounded-2xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="bg-slate-800 p-4 rounded-2xl"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <select
            className="bg-slate-800 p-4 rounded-2xl"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>Cashier</option>
            <option>Inventory Staff</option>
          </select>

          <input
            className="bg-slate-800 p-4 rounded-2xl"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <input
            type="date"
            className="bg-slate-800 p-4 rounded-2xl"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />

          <button
            onClick={addStaff}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl font-bold"
          >
            Add Staff
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Salary</th>
              <th className="p-4 text-left">Joining</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Permissions</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {staffList.map((staff) => (
              <tr key={staff._id} className="border-b border-white/5">
                <td className="p-4">{staff.name}</td>
                <td className="p-4">{staff.email}</td>
                <td className="p-4">{staff.phone || "-"}</td>
                <td className="p-4">{staff.role}</td>
                <td className="p-4">Rs {staff.salary || 0}</td>
                <td className="p-4">{staff.joiningDate || "-"}</td>

                <td className="p-4">
                  {staff.isActive ? (
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-xl">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-xl">
                      Blocked
                    </span>
                  )}
                </td>

                <td className="p-4 text-sm text-slate-300">
                  {Object.entries(staff.permissions || {})
                    .filter(([, value]) => value)
                    .map(([key]) => key)
                    .join(", ")}
                </td>

                <td className="p-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => toggleStaff(staff._id)}
                    className="bg-yellow-500 px-4 py-2 rounded-xl"
                  >
                    {staff.isActive ? "Block" : "Unblock"}
                  </button>

                  <button
                    onClick={() => deleteStaff(staff._id)}
                    className="bg-red-500 px-4 py-2 rounded-xl"
                  >
                    Delete
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

export default StaffManagement;
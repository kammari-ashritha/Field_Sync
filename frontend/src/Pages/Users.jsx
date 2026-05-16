import { useEffect, useState } from "react";
import api from "../utils/axiosInstance.js";

export default function Users() {
  const [users, setUsers] = useState([]);

  const load = () => api.get("/auth/users").then((r) => setUsers(r.data.users));
  useEffect(() => { load(); }, []);

  const setRole = async (id, role) => {
    await api.patch(`/auth/users/${id}/role`, { role });
    load();
  };

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold">Users</h1>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr><th className="py-2 pr-3">Name</th><th className="py-2 pr-3">Email</th><th className="py-2 pr-3">Role</th><th className="py-2 pr-3">Action</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="py-2 pr-3">{u.name}</td>
                <td className="py-2 pr-3">{u.email}</td>
                <td className="py-2 pr-3">{u.role}</td>
                <td className="py-2 pr-3">
                  {u.role === "worker"
                    ? <button className="btn-light" onClick={() => setRole(u._id, "admin")}>Make Admin</button>
                    : <button className="btn-light" onClick={() => setRole(u._id, "worker")}>Make Worker</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

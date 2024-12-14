"use client";
import GlobalApi from "../_utils/GlobalApi";
import { useEffect, useState } from "react";

const ManageRoles = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRolesAndUsers = async () => {
      try {
        const token = localStorage.getItem("jwt");

        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        // Fetch roles and users concurrently
        const [rolesData, usersData] = await Promise.all([
          GlobalApi.fetchRoles(token),
          GlobalApi.fetchUsers(token),
        ]);

        setRoles(rolesData.roles);
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);
        setError(err.response?.data?.error?.message || "Failed to load data");
        setLoading(false);
      }
    };
    fetchRolesAndUsers();
  }, []);

  const handleRoleChange = async (userId, newRoleId) => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        alert("No authentication token found");
        return;
      }

      await GlobalApi.updateUserRole(userId, newRoleId, token);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: { id: newRoleId } } : user
        )
      );
      alert("Role updated successfully!");
    } catch (error) {
      console.error("Failed to update role:", error);
      alert("Failed to update role.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-600 py-4">Loading data...</p>;
  if (error) return <p className="text-center text-red-600 py-4">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Manage User Roles
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {user.username}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {user.email}
                </td>

                <td className="py-3 px-6 text-center">
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    value={user.role?.id || ""}
                    onChange={(e) =>
                      handleRoleChange(user.id, parseInt(e.target.value))
                    }
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoles;

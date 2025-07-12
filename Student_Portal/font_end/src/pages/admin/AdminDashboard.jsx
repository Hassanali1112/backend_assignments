import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiMenu, FiX } from "react-icons/fi";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 520,
    enrolled: 172,
    completed: 255,
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("/api/applications/getapplications");
        console.log(res)
        const data = res.data;
        setApplications(data);

        const total = data.length;
        const enrolled = data.filter((app) => app.status === "approved").length;
        const completed = data.filter(
          (app) => app.status === "completed"
        ).length;

        setStats({ total, enrolled, completed });
      } catch (err) {
        console.error("Error fetching applications", err);
      }
    };

    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.patch(`/api/admin/applications/${id}`, {
        status,
      });
      if (res.data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status } : app))
        );
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const barData = [
    { name: "Total", value: stats.total },
    { name: "Enrolled", value: stats.enrolled },
    { name: "Completed", value: stats.completed },
  ];

  return (
    <div className="min-h-screen flex bg-blue-200 relative">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="p-6 text-center border-b">
          <h2 className="text-xl font-semibold text-blue-600">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-blue-100 text-blue-600 rounded"
                : "block p-2 text-gray-700 rounded hover:bg-gray-200"
            }
            onClick={closeSidebar}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-blue-100 text-blue-600 rounded"
                : "block p-2 text-gray-700 rounded hover:bg-gray-200"
            }
            onClick={closeSidebar}
          >
            All Users
          </NavLink>
          <NavLink
            to="/admin/applications"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-blue-100 text-blue-600 rounded"
                : "block p-2 text-gray-700 rounded hover:bg-gray-200"
            }
            onClick={closeSidebar}
          >
            Course Applications
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full p-4 pt-20 md:pt-4  transition-all ">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {barData.map((item) => (
            <div
              key={item.name}
              className="bg-white p-4 rounded shadow border flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                {item.name} Students
              </h3>
              <p className="text-3xl font-bold text-blue-600">{item.value}</p>
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={[item]}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded shadow p-4 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Course Applications</h2>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Course</th>
                <th className="border p-2">Campus</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="text-center">
                  <td className="border p-2">{app.name}</td>
                  <td className="border p-2">{app.email}</td>
                  <td className="border p-2">{app.courseSelect}</td>
                  <td className="border p-2">{app.campus}</td>
                  <td className="border p-2 capitalize">{!app.status ? "pending" : "approved"}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleUpdateStatus(app.id, "approved")}
                      className={`px-3 py-1 rounded text-white ${
                        app.status === "approved"
                          ? "bg-green-700 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                      disabled={app.status === "approved"}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app.id, "rejected")}
                      className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="min-h-screen flex bg-orange-700 relative ">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-orange-300 fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 shadow">
        <h2 className="text-xl font-semibold text-white">Student Portal</h2>
        <button onClick={toggleSidebar} className="text-2xl text-white">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-30 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-orange-300 text-white shadow transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="p-6 text-center border-b">
          <h2 className="text-xl font-semibold text-white">Student Portal</h2>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-orange-400 text-white rounded"
                : "block p-2 text-gray-800 rounded hover:bg-orange-200"
            }
            onClick={closeSidebar}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-orange-400 text-white rounded"
                : "block p-2 text-gray-800 rounded hover:bg-orange-200"
            }
            onClick={closeSidebar}
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/apply-course"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-orange-400 text-white rounded"
                : "block p-2 text-gray-800 rounded hover:bg-orange-200"
            }
            onClick={closeSidebar}
          >
            Apply Course
          </NavLink>
          <NavLink
            to="/dashboard/application-status"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-orange-400 text-white rounded"
                : "block p-2 text-gray-800 rounded hover:bg-orange-200"
            }
            onClick={closeSidebar}
          >
            Application Status
          </NavLink>
          <NavLink
            to="/dashboard/download-card"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-orange-400 text-white rounded"
                : "block p-2 text-gray-800 rounded hover:bg-orange-200"
            }
            onClick={closeSidebar}
          >
            Download Card
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 pt-20 md:pt-4 transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Student Portal</h1>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` ${isActive ? "text-orange-400" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              ` ${isActive ? "text-orange-400" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              ` ${isActive ? "text-orange-400" : ""}`
            }
          >
            Contact
          </NavLink>
        </div>
        <div className="space-x-4">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              ` ${isActive ? "text-orange-400" : ""}`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              ` ${isActive ? "text-orange-400" : ""}`
            }
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

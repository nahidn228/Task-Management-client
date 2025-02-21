import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="bg-white/35 backdrop-blur-lg shadow-lg   sticky top-0 z-50">
      <div className="navbar  w-11/12 mx-auto">
        {/* Left Side - Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-auto h-8 md:h-10"
              src="https://img.icons8.com/?size=100&id=tIUSbVurTTrH&format=png&color=000000"
              alt="Logo"
            />
            <span className="font-bold text-lg md:text-xl text-primary">
              Task Management
            </span>
          </Link>
        </div>

        {/* Right Side - Menu Items */}
        <div className="flex-none flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-4">
              <li>
                <NavLink to="/" className="hover:text-primary transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/tasks" className="hover:text-primary transition">
                  Tasks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addTask"
                  className="hover:text-primary transition"
                >
                  Add Task
                </NavLink>
              </li>
            </ul>
          </div>

          {/* User Profile / Login Button */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  title={user?.displayName}
                  className="w-10 h-10 rounded-full overflow-hidden"
                >
                  <img
                    referrerPolicy="no-referrer"
                    className="object-cover"
                    alt="User Profile Photo"
                    src={
                      user?.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 shadow-lg bg-base-100 rounded-box w-52 z-40"
              >
                <li>
                  <NavLink to="/" className="hover:bg-gray-200 rounded-lg px-2">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tasks"
                    className="hover:bg-gray-200 rounded-lg px-2"
                  >
                    Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/addTask"
                    className="hover:bg-gray-200 rounded-lg px-2"
                  >
                    Add Task
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="btn btn-outline btn-error btn-sm mt-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink className=" btn btn-primary" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

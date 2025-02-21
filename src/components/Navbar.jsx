import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { AuthContext } from "../providers/AuthProvider";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="navbar  shadow-sm  mx-auto">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="" />
          <span className="font-bold">Task Management</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 items-center lg:hidden flex">
          <li>
            <ThemeToggle />
          </li>

          {!user && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
        <ul className="menu menu-horizontal px-1 items-center hidden lg:flex">
          
          <li>
            <ThemeToggle />
          </li>
        </ul>

        <div className="dropdown dropdown-end z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div title={user?.displayName} className="w-10 rounded-full">
              <img
                referrerPolicy="no-referrer"
                alt="User Profile Photo"
                src={
                  user
                    ? user?.photoURL
                    : "https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/tasks">Tasks</NavLink>
            </li>
            <li>
              <NavLink to="/addTask">Add Tasks</NavLink>
            </li>
          
          </ul>
        </div>
        {!user ? (
          <NavLink className="btn ml-2" to="/login">
            Login
          </NavLink>
        ) : (
          <button onClick={logOut} className="btn ml-2 block text-center">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

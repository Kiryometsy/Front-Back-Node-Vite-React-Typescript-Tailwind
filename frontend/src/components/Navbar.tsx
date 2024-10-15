// src/components/Navbar.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role"); // Clear the role from local storage
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-white text-xl font-semibold">MyApp</div>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Links for Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link
            to="/"
            className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Register
          </Link>

          {role && (
            <>
              <Link
                to="/main"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
              >
                Main
              </Link>
              {role === "admin" && (
                <Link
                  to="/admin"
                  className="text-white hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 text-white p-4 rounded shadow-md mt-2">
          <Link
            to="/"
            className="block px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Register
          </Link>

          {role && (
            <>
              <Link
                to="/main"
                className="block px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Main
              </Link>
              {role === "admin" && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block bg-red-600 hover:bg-red-700 text-white w-full px-4 py-2 rounded transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

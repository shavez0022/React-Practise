import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function App() {
  const navigate = useNavigate();
  const [Role, setRole] = useState("");

  function Logout() {
    if (window.confirm("Are you sure you want to log out?")) {
      sessionStorage.removeItem("tokken");
      sessionStorage.removeItem("role");
      sessionStorage.setItem("toastMessage",1);
      setRole("");
      navigate("/");
    }
  }

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    if (storedRole) {
      setRole(atob(storedRole));
    } else {
      setRole("");
    }
  }, []); // Added dependency array to ensure it runs only on mount

  return (
    <>
      <nav className="p-2.5 flex items-center justify-between">
        <Link to="/home">
          <img
            src="https://files.oaiusercontent.com/file-4qgLLmmzbKi34pFNWN4FHd?se=2025-02-24T10%3A01%3A07Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db6efff6b-6d71-4441-9885-1229c53fe9e6.webp&sig=WoMG8zGhTyrccMdrQSnp5O4LeaiEUrKDmgsFGwwK0FI%3D"
            alt="Hyper Ambulance Logo"
            className="h-12 w-30"
          />
        </Link>

        {Role === "User" && (
          <div className="flex text-3xl text-black">
            <Link to="/home" className="hover:bg-emerald-500 px-3 py-1 rounded">
              Home
            </Link>
            <Link
              to="/about"
              className="hover:bg-emerald-500 px-3 py-1 rounded"
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="hover:bg-emerald-500 px-3 py-1 rounded"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="hover:bg-emerald-500 px-3 py-1 rounded"
            >
              Contact
            </Link>
          </div>
        )}

        {Role === "Admin" && (
          <div className="flex text-xl font-semibold text-black">
            <Link to="/trip" className="hover:bg-emerald-500 px-3 py-1 rounded">
              Trips
            </Link>
            <Link
              to="/ambulance"
              className="hover:bg-emerald-500 px-3 py-1 rounded"
            >
              Ambulance
            </Link>
            <Link
              to="/drivers"
              className="hover:bg-emerald-500 px-3 py-1 rounded"
            >
              Drivers
            </Link>
            <Link
              to="/hospital"
              className="hover:bg-emerald-500 px-3 py-1 rounded"
            >
              Hospitals
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className=" text-black">Welcome {Role ? Role : "Guest"}</div>
          {Role ? (
            <button
              className="hover:bg-red-500 cursor-pointer px-4 py-2 rounded-3xl text-white bg-red-800"
              onClick={Logout}
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/"
              className="hover:bg-green-500 cursor-pointer px-4 py-2 rounded-3xl text-white bg-green-800"
            >
              Log In
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
export const Sidebar = () => {
  return (
    <div className="w-64  bg-gray-800 text-white p-4 fixed">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul className="space-y-3">
        <li><a href="/home" className="block p-2 rounded hover:bg-gray-700">Home</a></li>
        <li><a href="/dashboard" className="block p-2 rounded hover:bg-gray-700">Dashboard</a></li>
        <li><a href="/settings" className="block p-2 rounded hover:bg-gray-700">Settings</a></li>
      </ul>
    </div>
  );
};
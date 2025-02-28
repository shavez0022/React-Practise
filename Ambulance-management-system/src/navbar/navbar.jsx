import { Link } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaCogs, FaUsers, FaAmbulance, FaHospital, FaCar, FaPhone, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
export function App() {
  const navigate = useNavigate();
  const [Role, setRole] = useState("");
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  function Logout() {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("tokken");
      localStorage.removeItem("role");
      localStorage.setItem("toastMessage", 1);
      setRole("");
      navigate("/");
    }
  }

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(atob(storedRole));
    } else {
      setRole("");
    }
  }, []); // Added dependency array to ensure it runs only on mount

  return (
    <>
      <nav className="p-2.5 flex items-center justify-between bg-gray-50">
        <Link to="/home">
          <img
                src="/pics/logo1.webp"
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
           <div className="flex space-x-4 text-xl">
           <Link
             to="/trip"
             className={`flex items-center gap-2 px-3 py-1 rounded text-black ${
               isActive("/trip") ? "bg-emerald-500" : "hover:bg-emerald-500"
             }`}
           >
             <FaCar /> Trips
           </Link>
           <Link
             to="/ambulance"
             className={`flex items-center gap-2 px-3 py-1 rounded text-black ${
               isActive("/ambulance") ? "bg-emerald-500" : "hover:bg-emerald-500"
             }`}
           >
             <FaAmbulance /> Ambulance
           </Link>
           <Link
             to="/drivers"
             className={`flex items-center gap-2 px-3 py-1 rounded text-black ${
               isActive("/drivers") ? "bg-emerald-500" : "hover:bg-emerald-500"
             }`}
           >
             <FaUsers /> Drivers
           </Link>
           <Link
             to="/hospital"
             className={`flex items-center gap-2 px-3 py-1 rounded text-black ${
               isActive("/hospital") ? "bg-emerald-500" : "hover:bg-emerald-500"
             }`}
           >
             <FaHospital /> Hospitals
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

export function Imagebg(){
  return(
<div className="absolute inset-0">
          <img
            src="/pics/bgmain.webp"
            alt="background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
  );
}
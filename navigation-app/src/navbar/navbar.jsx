import { useState } from "react";
import { Link } from "react-router-dom";

export function App() {
  
  return (
    <>
      <nav className="bg-neutral-900 p-3.5">
        <div className="container mx-1.5 flex justify-between items-center">
          <Link to="/home" className="text-white text-l font-bold ">
          Hyper Ambulance  </Link>
          <div className="text-amber-50 mx-auto flex justify-center items-end gap-5">
             <Link to="/home" className="hover:bg-emerald-500">
                Home
             </Link>
             <Link to="/about" className="hover:bg-emerald-500">
                About Us
              </Link>
              <Link to="/services" className="hover:bg-emerald-500">
                Services
              </Link>
              <Link to="/contact" className="hover:bg-emerald-500">
                Contact
              </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
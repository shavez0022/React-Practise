import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export function App() {
  const navigate= useNavigate();
  const [Role, setRole] = useState(atob(sessionStorage.getItem("role")));
  function Logout(){
    if(confirm("Are you sure you want to log out")){
    sessionStorage.removeItem("tokken");
    sessionStorage.removeItem("role");
    navigate("/")
  }
}
 return (
    <>
    <nav className="bg-neutral-900 p-2.5 flex items-center justify-between">
    <img 
    src="http://localhost/my-react-app/pics/logo1.webp" 
    alt="Hyper Ambulance Logo" 
    className="h-10 w-35" 
  />
{
  Role ==='User' && (
    <div className="flex  text-amber-50">
    <Link to="/home" className="hover:bg-emerald-500 px-3 py-1 rounded">Home</Link>
    <Link to="/about" className="hover:bg-emerald-500 px-3 py-1 rounded">About Us</Link>
    <Link to="/services" className="hover:bg-emerald-500 px-3 py-1 rounded">Services</Link>
    <Link to="/contact" className="hover:bg-emerald-500 px-3 py-1 rounded">Contact</Link>
  </div>
  )
}
  {
  Role ==='Admin' && (
    <div className="flex  text-amber-50">
    <Link to="/trip" className="hover:bg-emerald-500 px-3 py-1 rounded">Trips</Link>
    <Link to="/ambulance" className="hover:bg-emerald-500 px-3 py-1 rounded">Ambulance</Link>
    <Link to="/drivers" className="hover:bg-emerald-500 px-3 py-1 rounded">Drivers</Link>
    <Link to="/hospital" className="hover:bg-emerald-500 px-3 py-1 rounded">Hospitals</Link>
  </div>
  )
  }
    <div className="flex items-center gap-4">
    <div className="text-white">Welcome {Role}</div>
      <button className="hover:bg-red-500 cursor-pointer px-4 py-2 rounded-3xl text-white bg-red-800"
      onClick={Logout}>Log Out</button>
   </div>
   </nav>
  </>
  );
}

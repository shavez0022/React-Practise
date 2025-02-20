import './about.css'
import {App} from '../navbar/navbar'
import {  useNavigate } from 'react-router-dom';
import { useEffect } from "react";


 export function AboutUs() {
  
    const navigate= useNavigate();
  
    useEffect(() => {
      if (sessionStorage.getItem("tokken") !== "111") {
          navigate("/");
      }
  }, [navigate]);
    return (
        <>
        <App />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-gray-600 mt-4">
          Welcome to my project! I am currently working on it.........
        </p>
      </div>
      </>
    );
 }

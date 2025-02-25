import './contact.css'
import { App } from '../navbar/navbar';
import {  useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export function Contact (){
    const navigate= useNavigate();

    useEffect(() => {
        if (atob(localStorage.getItem("tokken")) !== "112") {
            navigate("/");
        }
    }, [navigate]);
    return(
        <>
        <App/>
        <div className='phone-no bg-amber-800 text-2xl text-center text-emerald-200'>
            Shavez : 6387523912
        </div>
        </>
    );
}
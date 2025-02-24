import React from "react";
import './services.css';
import {App} from '../navbar/navbar'
import {  useNavigate } from 'react-router-dom';

export function Services(){
    return(
        <>
        <App/>
        <p className="text-2xl text-amber-950 justify-center">Our services</p>
        </>
    );
}
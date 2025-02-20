import './home.css';
import {App} from "../navbar/navbar";
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Footer from '../fotter/fotter';
export function Home(){
    const navigate= useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("tokken") !== "111") {
            navigate("/");
        }
    }, [navigate]);

    return(
        <>
        <App />
        <div className="relative min-h-screen bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://www.goaid.in/wp-content/uploads/2023/12/oxygen-ambulance-1.webp"
          alt="background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8">
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
          {/* Left Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-3">
              Hyper Ambulance: The Superfast Ambulance
            </h3>
            <h4 className="text-lg mb-4 font-semibold">Sabse Tezz Sabse Aage...</h4>
            <p className="text-gray-600 mb-4">
              Ambulance Service in your neighborhood. Hyper Ambulance is
              India’s largest ambulance service with a whopping 1 Million+
              customers. Experience the quickest and most reliable medical
              assistance right at your doorstep.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Book Now
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Book For Advance
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2">
            <img
              src="https://www.goaid.in/wp-content/uploads/2024/02/IMG20230320194858-1.webp"
              alt="Ambulance Service"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600">
            At Hyper Ambulance, we offer a wide range of medical services to
            meet your needs. Our fleet of ambulances is equipped with all the
            necessary equipment and facilities to ensure the highest standard
            of medical care. Choose us for quick, reliable, and efficient
            service!
          </p>
        </div>
      </div>
    </div>
    <Footer/>
        </>
    );
}
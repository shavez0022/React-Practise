import "./home.css";
import { App } from "../navbar/navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../fotter/fotter";
export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!(sessionStorage.getItem("tokken"))) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <App />
      <div className="relative min-h-screen bg-gray-100">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://files.oaiusercontent.com/file-7NshBEzaemefPo441kYGjg?se=2025-02-21T06%3A09%3A46Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc407496f-6796-49ef-a048-2e4431dcf68e.webp&sig=TnFWzUp0TlQb4XR0dYGu376H0lkvN98mujjVS6m22DM%3D"
            alt="background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center p-8">
          <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
         
            <div className="md:w-1/2 text-center md:text-left">
              <img  className="h-50 w-150" src="http://localhost/my-react-app/pics/logo1.webp"alt="" />
              <h4 className="text-lg mb-4 font-semibold">
                Sabse Tezz Sabse Aage...
              </h4>
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
                src="https://files.oaiusercontent.com/file-TYuwwZR8Xd3PA3o2bvH63H?se=2025-02-21T06%3A10%3A33Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D64593af1-9f84-4087-b688-db96eff4fa59.webp&sig=cS9B9AZH/IXStwqNKgbByNbGylj5/7459W7BB4z7WNw%3D"
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
      <Footer />
    </>
  );
}
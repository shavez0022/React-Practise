import "./home.css";
import { App} from "../navbar/navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../footer/footer";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("toastMessage")) {
      toast.success("Login Successful...", { transition: Slide });
      localStorage.removeItem("toastMessage");
    }
  }, []);

  return (
    <>
      <App />
      <div className="relative min-h-screen bg-gray-100">
        <ToastContainer />
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
              <img
                className="h-50 w-150"
                src="https://files.oaiusercontent.com/file-4qgLLmmzbKi34pFNWN4FHd?se=2025-02-24T10%3A01%3A07Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db6efff6b-6d71-4441-9885-1229c53fe9e6.webp&sig=WoMG8zGhTyrccMdrQSnp5O4LeaiEUrKDmgsFGwwK0FI%3D"
                alt=""
              />
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
                src="https://files.oaiusercontent.com/file-GScUWGQ7Zc2kEkDDQGu9az?se=2025-02-24T09%3A59%3A16Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc77865a2-490f-4df9-ab20-e59bb8f55060.webp&sig=sAm/sn%2B/DIADZmiIafgCpc2P2R9A9LqFXRxZBN1GWgk%3D"
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { App } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Pagination } from "../pagination/pagination";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Ambulance() {
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [SearchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const Submit = (e) => {
         e.preventDefault();
      const formData = new FormData(e.target);
      axios.post("http://localhost/project2/api/addnewambulance_api.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      })
        .then((response) => {
          if (response.data.status === "Success") {
            toast.success("New ambulance registered",{ transition: Slide })
            console.log("Data submitted successfully!");
            setIsOpen(false);
            e.target.reset();
          } else {
            toast.success(" registered",{ transition: Slide })
            console.error("Submission failed:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    };

  useEffect(() => {
    console.log(SearchTerm);
    axios
      .get("http://localhost/project2/api/getambulance_api.php", {
        params: { currentpage: currentPage, name: SearchTerm },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setTrips(response.data.data);
          setCurrentPage(1);
          setTotalPages(response.data.totalPages);
        } else {
          setTrips([]);
          setTotalPages(1);
          setCurrentPage(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [SearchTerm]);

  useEffect(() => {
    console.log(SearchTerm);
    axios
      .get("http://localhost/project2/api/getambulance_api.php", {
        params: { currentpage: currentPage, name: SearchTerm },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setTrips(response.data.data);
          setTotalPages(response.data.totalPages);
        } else {
          setTrips([]);
          setTotalPages(1);
          setCurrentPage(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to load trip data!", { position: "top-right" });
      });
  }, [currentPage]);

  return (
    <>
      <App />
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="absolute inset-0">
          <img
            src="https://files.oaiusercontent.com/file-7NshBEzaemefPo441kYGjg?se=2025-02-21T06%3A09%3A46Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc407496f-6796-49ef-a048-2e4431dcf68e.webp&sig=TnFWzUp0TlQb4XR0dYGu376H0lkvN98mujjVS6m22DM%3D"
            alt="background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 py-10">
          {/* Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
            {/* Title Section */}
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-4xl font-extrabold text-black">
                Ambulance Details
              </h2>
              <button
                onClick={() => setIsOpen(true)}
                className="hover:bg-emerald-500 cursor-pointer px-3 py-2 rounded-xl text-white bg-gray-900"
              >
                Add More &#43;
              </button>
              <input
                type="text"
                placeholder="Search..."
                onKeyUp={(e) => setSearchTerm(e.target.value)}
                className="text-cyan-50 px-3 py-2 w-64 border-2 bg-black border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <table className="w-full border-collapse rounded-lg">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Ambulance No</th>
                  <th className="py-3 px-4 text-left">Ambulance Type</th>
                  <th className="py-3 px-4 text-left">Ambulance Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {trips.length > 0 ? (
                  trips.map((trip, index) => (
                    <tr
                      key={trip.id}
                      className="border-b transition duration-200 hover:bg-gray-100"
                    >
                      <td className="py-4 px-4 ">{index + 1}</td>

                      <td className="py-4 px-4 ">{trip.registration_number}</td>

                      <td className="py-4 px-4 ">{trip.ambulance_type}</td>

                      <td className="py-4 px-4 ">
                        {trip.ambulance_status == 3
                          ? "Grounded"
                          : trip.ambulance_status == 2
                            ? "Maintenance"
                            : trip.ambulance_status == 0
                              ? "Went to Trip"
                              : trip.ambulance_status == 1
                                ? "Available"
                                : "Unknown"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-6 text-center text-gray-500 text-lg"
                    >
                      No records found 🚫
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                maxWidth: "28rem",
                width: "100%",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Add new ambulance</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: "#6b7280",
                    fontSize: "1.5rem",
                    lineHeight: "1",
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>
              </div>
              {/* Modal Body */}
              <div style={{ color: "#374151" }}>
                <form onSubmit={Submit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                  <fieldset>
                    {/* Registration Number Field */}
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Registration Number
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Ambulance Type Field */}
                    <div className="mb-6">
                      <label htmlFor="ambulance_type" className="block text-sm font-medium text-gray-700 mb-2">
                        Ambulance Type
                      </label>
                      <input
                        type="text"
                        id="ambulance_type"
                        name="ambulance_type"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Add
                    </button>
                  </fieldset>
                </form>       </div>

              <div
                style={{
                  marginTop: "1.5rem",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ef4444",
                    color: "white",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
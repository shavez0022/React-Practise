import React, { useEffect, useState } from "react";
import axios from "axios";
import { App } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Pagination } from "../pagination/pagination";

export function Drivers() {
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [SearchTerm, setSearchTerm] = useState("");

  // Fetch API Data
  useEffect(() => {
    console.log(SearchTerm);
    axios
      .get("http://localhost/project2/api/getdriver_api.php", {
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

  const Tripsdata = () => {
    axios
      .get("http://localhost/project2/api/getdriver_api.php", {
        params: { currentpage: currentPage },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setTrips(response.data.data);
          setTotalpages(response.data.totalPages);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    console.log(currentPage);
    Tripsdata();
  }, [currentPage]);


  return (
    <>
      <App />
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        {/* Background Image */}
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
                Driver Details
              </h2>
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
                  <th className="py-3 px-4 text-left">Driver Name</th>
                  <th className="py-3 px-4 text-left">Driver Status</th>
                  <th className="py-3 px-4 text-left">Contact Number</th>
                  <th className="py-3 px-4 text-left">License Number</th>
                  <th className="py-3 px-4 text-left">Address</th>
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

                      <td className="py-4 px-4 ">{trip.name}</td>

                      <td className="py-4 px-4 ">
                        {trip.driver_status == 2
                          ? "Maintenance"
                          : trip.driver_status == 0
                          ? "Went to Trip"
                          : trip.driver_status == 1
                          ? "Available"
                          : "Unknown"}
                      </td>

                      <td className="py-4 px-4 ">
                        {trip.contact_number}
                      </td>
                      <td className="py-4 px-4 ">
                        {trip.license_number}
                      </td>
                      <td className="py-4 px-4 ">{trip.address}</td>
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
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
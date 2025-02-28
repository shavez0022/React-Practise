import React, { useEffect, useState } from "react";
import axios from "axios";
import { App } from "../navbar/navbar";
import { Pagination } from "../pagination/pagination";
import { Footer } from "../footer/footer";

export function Trips() {
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/project2/api/gettrips_api.php", {
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
      });
  }, [SearchTerm, currentPage]);

  return (
    <>
      <App />
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/pics/bgmain.webp"
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
             <h4 className="text-2xl  font-extrabold text-black">Trip Details</h4>
              <input
                type="text"
                placeholder="Search..."
                onKeyUp={(e) => setSearchTerm(e.target.value)}
                className="text-cyan-50 px-3 py-2 w-56 border-2 bg-black border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <table className="w-full border-collapse rounded-lg">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Ambulance No</th>
                  <th className="py-3 px-4 text-left">Driver Name</th>
                  <th className="py-3 px-4 text-left">Hospital Name</th>
                  <th className="py-3 px-4 text-left">Trip Start</th>
                  <th className="py-3 px-4 text-left">Trip End</th>
                  <th className="py-3 px-4 text-left">Distance Covered</th>
                </tr>
              </thead>
              <tbody>
                {trips.length > 0 ? (
                  trips.map((trip, index) => (
                    <tr
                      key={trip.id}
                      className="border-b transition duration-200 hover:bg-gray-100"
                    >
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4">{trip.registration_number}</td>
                      <td className="py-4 px-4">{trip.driver_name}</td>
                      <td className="py-4 px-4">{trip.hospital_name}</td>
                      <td className="py-4 px-4">{trip.trip_start}</td>
                      <td className="py-4 px-4">{trip.trip_end}</td>
                      <td className="py-4 px-4">{trip.distance_covered_km} km</td>
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

          {/* Pagination */}
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
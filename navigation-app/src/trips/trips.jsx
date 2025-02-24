import React, { useEffect, useState } from "react";
import axios from "axios";
import { App } from "../navbar/navbar";


export function Trips() {
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch API Data
  const fetchTripsData = () => {
    axios
      .get("http://localhost/project2/api/gettrips_api.php", {
        params: { currentpage: currentPage },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setTrips(response.data.data);
          setTotalPages(response.data.totalPages);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to load trip data!", { position: "top-right" });
      });
  };

  useEffect(() => {
    fetchTripsData();
  }, [currentPage]);

  const pagesPerGroup = 5;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

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
          <h2 className="text-4xl font-extrabold text-center text-black mb-6">
            Trip Details
          </h2>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
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
          <div className="flex flex-col items-center mt-8">
            <h2 className="text-lg font-semibold mb-4">
              Page {currentPage} of {totalPages}
            </h2>

            <div className="flex space-x-2">
              {currentPage > 2 &&(
            <button
                onClick={() => setCurrentPage(1)}
                
                className="px-4 py-2 rounded bg-gray-500 text-gray-200 hover:bg-gray-900 disabled:opacity-50"
              >
                First
              </button>
              )}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-500 text-gray-200 hover:bg-gray-900 disabled:opacity-50"
              >
                Prev
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded font-semibold ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "bg-gray-500 text-gray-200 hover:bg-gray-900 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-500 text-gray-200 hover:bg-gray-900 disabled:opacity-50"
              >
                Next
              </button>

              {currentPage < totalPages-1 &&(
            <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-4 py-2 rounded bg-gray-500 text-gray-200 hover:bg-gray-900 disabled:opacity-50"
              >
                Last
              </button>
              )}
            </div>

            {/* Go to Page Input */}
            <input
              type="number"
              placeholder="Go to page..."
              onChange={(e) => {
                const page = Number(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                } else {
                  setCurrentPage(1);
                }
              }}
              className="border-2 bg-gray-500 p-2 rounded w-32 text-center mt-4"
            />
          </div>
        </div>
      </div>
    </>
  );
}
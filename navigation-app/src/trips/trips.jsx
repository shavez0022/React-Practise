import React, { useEffect, useState } from "react";
import axios from "axios";
import { App } from "../navbar/navbar";

export function Trips() {
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState();

  // Fetch API Data
  const Tripsdata = () => {
    axios
      .get("http://localhost/project2/api/gettrips_api.php", {
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
      <div className="relative min-h-screen items-center justify-center bg-gray-100">
        {/* Content Wrapper */}
        <div className="relative z-10 container mx-auto p-4 top-7 w-full">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Trip Details
          </h2>

          {/* Table */}
          <div className="overflow-x-auto min-w-full">
  <table className="w-[1000px] table-fixed bg-red-400 opacity-85 shadow-md rounded-lg">
    {/* Table Header */}
    <thead>
      <tr className="bg-gray-200 text-gray-700">
        <th className="py-4 px-5 w-12">#</th>
        <th className="py-4 px-5 w-40">Ambulance No</th>
        <th className="py-4 px-5 w-40">Driver Name</th>
        <th className="py-4 px-5 w-40">Hospital Name</th>
        <th className="py-4 px-5 w-40">Trip Start</th>
        <th className="py-4 px-5 w-40">Trip End</th>
        <th className="py-4 px-5 w-40">Distance Covered (km)</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody className="min-h-[400px]">
      {trips.length > 0 ? (
        trips.map((trip, index) => (
          <tr key={trip.id} className="border-b text-black font-medium">
            <td className="py-3 px-4 text-center">{index + 1}</td>
            <td className="py-3 px-4 text-center">{trip.registration_number}</td>
            <td className="py-3 px-4 text-center">{trip.driver_name}</td>
            <td className="py-3 px-4 text-center">{trip.hospital_name}</td>
            <td className="py-3 px-4 text-center">{trip.trip_start}</td>
            <td className="py-3 px-4 text-center">{trip.trip_end}</td>
            <td className="py-3 px-4 text-center">{trip.distance_covered_km} km</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="py-10 text-center text-gray-500">
            No records found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-lg font-bold mb-4">
            Page {currentPage} of {totalPages}
          </h2>

          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
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
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
            <input
              type="number"
              placeholder="Go to page"
              onChange={(e) => {
                const page = Number(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                } else {
                  setCurrentPage(1);
                }
              }}
              className="border-2 p-0.5 rounded w-28 mt-auto text-center"
            />
          </div>
        </div>
      </div>
    </>
  );
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import { App, Imagebg } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Pagination } from "../pagination/pagination";
import { ToastContainer, Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

export function Ambulance() {
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState({
    exp: "",
    iat: "",
    iss: "",
    sub: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("tokken");
    if (token) {
      try {
        const decoded = jwtDecode(atob(token)); // Decode the stored JWT
        setDecodedToken(decoded);
        if (decoded.exp < Math.floor(Date.now() / 1000)) {
          localStorage.removeItem("tokken");
          localStorage.removeItem("role");
          localStorage.setItem("toastMessage", 1);
          navigate("/");
        }
      } catch (error) {
        console.error("Invalid Token:", error);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Updated Decoded Token:", decodedToken.exp);
    const date = new Date(decodedToken.exp * 1000);
    console.log(date.toLocaleString());
  }, [decodedToken]);

  const [formData, setFormData] = useState({
    registration_number: "",
    ambulance_type: "",
  });
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [SearchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [FormType, setFormType] = useState("Submit");
  const [updateButton, setUpdateButton] = useState();
  const [status, setstatus] = useState("all"); // Default value

  useEffect(() => {
    if (atob(localStorage.getItem("role")) != "Admin") {
      navigate("/home");
    }
  });

  useEffect(() => {
    axios
      .get("http://localhost/project2/api/getambulance_api.php", {
        params: { currentpage: 1, status: status, name: SearchTerm },
      })
      .then((response) => {
        if (response.data.status === "Success") {
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
  }, [status]);

  useEffect(() => {
    axios
      .get("http://localhost/project2/api/getambulance_api.php", {
        params: { currentpage: currentPage, status: status, name: SearchTerm },
      })
      .then((response) => {
        if (response.data.status === "Success") {
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
    axios
      .get("http://localhost/project2/api/getambulance_api.php", {
        params: { currentpage: currentPage, status: status, name: SearchTerm },
      })
      .then((response) => {
        if (response.data.status === "Success") {
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
  }, [currentPage, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.registration_number);
    data.append("ambulance_type", formData.ambulance_type);
    if (FormType == "Submit") {
      axios
        .post("http://localhost/project2/api/addnewambulance_api.php", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status === "Success") {
            toast.success("New ambulance registered", { transition: Slide });
            console.log("Data submitted successfully!");
            setIsOpen(false);
            e.target.reset();
            setCurrentPage(totalPages);
          } else {
            toast.error("There was an error", { transition: Slide });
            console.error("Submission failed:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    } else if (FormType == "Update") {
      data.append("id", updateButton);
      axios
        .post("http://localhost/project2/api/updateambulance_api.php", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status === "Success") {
            toast.success("Ambulance Updates", { transition: Slide });
            console.log("Data submitted successfully!");
            setIsOpen(false);
            e.target.reset();
          } else {
            toast.error("There was an error", { transition: Slide });
            console.error("Submission failed:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    }
  };

  const updateValue = (e) => {
    setFormType("Update");
    setIsOpen(true);
    setUpdateButton(e.target.value);
  };

  useEffect(() => {
    if (updateButton) {
      axios
        .post("http://localhost/project2/api/getambulancebyid.php", {
          id: updateButton,
        })
        .then((response) => {
          if (response.data.status === "Success") {
            setFormData({
              registration_number: response.data.data.registration_number,
              ambulance_type: response.data.data.ambulance_type,
            });
          } else {
            setFormData({
              registration_number: "",
              ambulance_type: "",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [updateButton]);

  function deleteValue(e) {
    if (confirm("Are you sure you want to delete this row")) {
      const deleteId = e.target.value;
      axios
        .post("http://localhost/project2/api/delete-ambulance_api.php", {
          id: deleteId,
        })
        .then((response) => {
          if (response.data.status === "success") {
            toast.success("Row deleted", { transition: Slide });
            axios
              .get("http://localhost/project2/api/getambulance_api.php", {
                params: { currentpage: currentPage, name: SearchTerm },
              })
              .then((response) => {
                if (response.data.status === "Success") {
                  setTrips(response.data.data);
                  setTotalPages(response.data.totalPages);
                } else {
                  setTrips([]);
                  setTotalPages(1);
                  setCurrentPage(1);
                }
              });
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }
  return (
    <>
      <App />
      <ToastContainer />
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <Imagebg />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 py-10">
          {/* Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
            {/* Title Section */}
            <div className="w-full flex justify-between items-center mb-4">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-extrabold text-black mr-4">
                  Ambulance Details
                </span>

                <button
                  onClick={() => {
                    setIsOpen(true); // Open the modal or form
                    setFormType("Submit");
                    setUpdateButton();
                    setFormData({
                      registration_number: "",
                      ambulance_type: "",
                    });
                  }}
                  className="hover:rounded hover:bg-emerald-600  cursor-pointer px-3 py-2 rounded-3xl text-white bg-gray-900 transition-all duration-500"
                >
                  Add More &#43;
                </button>
                <select
                  name="gender"
                  className="bg-gray-900 text-white px-1 py-1.5 rounded-xl"
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                >
                  <option value="all">Select Availability</option>
                  <option value="available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

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
                  <th className="py-3 px-4 text-left">Ambulance Type</th>
                  <th className="py-3 px-4 text-left">Ambulance Status</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {trips.length > 0 ? (
                  trips.map((trip, index) => (
                    <tr
                      key={trip.id}
                      className="border-b transition duration-200 hover:bg-gray-100">
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
                      <td className="py-4 px-4 ">
                        <button
                          value={trip.id}
                          onClick={(e) => updateValue(e)}
                          className="hover:rounded  cursor-pointer px-3 py-2 rounded-3xl text-white bg-neutral-800 transition-all duration-500"
                        >
                          Update
                        </button>
                        <button
                          value={trip.id}
                          onClick={(e) => deleteValue(e)}
                          className="hover:rounded cursor-pointer px-3 py-2 rounded-3xl text-white bg-red-900 transition-all duration-500"
                        >
                          delete
                        </button>
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
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  Add new ambulance
                </h3>
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
                <form
                  onSubmit={Submit}
                  className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6"
                >
                  <fieldset>
                    {/* Registration Number Field */}
                    <div className="mb-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Registration Number
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="registration_number"
                        value={formData.registration_number}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Ambulance Type Field */}
                    <div className="mb-6">
                      <label
                        htmlFor="ambulance_type"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Ambulance Type
                      </label>
                      <input
                        type="text"
                        id="ambulance_type"
                        name="ambulance_type"
                        value={formData.ambulance_type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {FormType}
                    </button>
                  </fieldset>
                </form>
              </div>

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
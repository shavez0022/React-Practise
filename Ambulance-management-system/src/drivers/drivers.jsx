import React, { useEffect, useState } from "react";
import axios from "axios";
import { App,Imagebg } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../pagination/pagination";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Drivers() {
  const navigate = useNavigate();
  

  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState("Submit");
  const [status, setstatus] = useState("all"); // Default value

  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact_number: "",
    license_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pin_code: "",
    id:""
  });

   useEffect(()=>
    {
      if(atob(localStorage.getItem("role"))!='Admin'){
        navigate("/home");
  }
    });

  useEffect(() => {
    axios
      .get("http://localhost/project2/api/getdriver_api.php", {
        params: { currentpage: 1, name: searchTerm ,status:status },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setTrips(response.data.data);
          setCurrentPage(1);
          setTotalPages(response.data.totalPages);
        } else {
          setTrips([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [status]);

  useEffect(() => {
    axios
      .get("http://localhost/project2/api/getdriver_api.php", {
        params: { currentpage: currentPage, name: searchTerm ,status:status },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setTrips(response.data.data);
          setCurrentPage(1);
          setTotalPages(response.data.totalPages);
        } else {
          setTrips([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [searchTerm]);

  useEffect(() => {
    axios
      .get("http://localhost/project2/api/getdriver_api.php", {
        params: { currentpage: currentPage, name: searchTerm ,status:status },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setTrips(response.data.data);
          setTotalPages(response.data.totalPages);
        } else {
          setTrips([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage,isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType == "Submit") {
    axios
      .post("http://localhost/project2/api/addnewdriver_api.php", formData, {
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
  } else if(formType == "Update"){
    axios
    .post("http://localhost/project2/api/updatedriver.php", formData,{
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
  }


  const updateValue = (e) => {
    setFormType('Update');
    setIsOpen(true)
    const driverId = e.target.value;
    setFormData({
      id: e.target.value,
    });
    axios
    .post("http://localhost/project2/api/getdriverbyid.php", {
      id: driverId,
    })
    .then((response) => {
      if (response.data.status === "Success") {
        setFormData({
          name:response.data.data.name, 
          age: response.data.data.age,
          gender:response.data.data.gender,
          contact_number: response.data.data.contact_number,
          license_number: response.data.data.license_number,
          address_line1: response.data.data.address_line1,
          address_line2: response.data.data.address_line2,
          city: response.data.data.city,
          state: response.data.data.state,
          pin_code: response.data.data.pin_code,
          id:response.data.data.id,
        });
      } else {
            console.log(response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  const deleteValue = (e) => {
    if (confirm("Are you sure you want to delete this row")) {
      console.log(e.target.value);
      const deleteId = e.target.value;
      axios
        .post("http://localhost/project2/api/delete-driver_api.php", {
          id: deleteId,
        })
        .then((response) => {
          if (response.data.status === "success") {
            toast.success("Row deleted", { transition: Slide });
            axios
            .get("http://localhost/project2/api/getdriver_api.php", {
              params: { currentpage: currentPage, name: searchTerm },
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
          }})
        
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  return (
    <>
      <App />
      <ToastContainer />
      <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
        <Imagebg/>
        

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 py-10">
          {/* Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
            {/* Title Section */}
            <div className="w-full flex justify-between items-center mb-4">
              <div className="flex items-center gap-1 ">
                <h4 className="text-2xl font-extrabold text-black mr-4">
                  Drivers Details
                </h4>
                <button
                onClick={() => {
                  setIsOpen(true);
                  setFormType("Submit");
                  setFormData({
                    name: "",
                    age: "",
                    gender: "",
                    contact_number: "",
                    license_number: "",
                    address_line1: "",
                    address_line2: "",
                    city: "",
                    state: "",
                    pin_code: "",
                  });
                }}
                className="hover:rounded hover:bg-emerald-600  cursor-pointer px-3 py-2 rounded-3xl text-white bg-gray-900 transition-all duration-500"
                >
                Add More &#43;
              </button>
              <select name="gender" className="bg-gray-900 text-white px-1 py-1.5 rounded-xl" value={status} onChange={(e)=>setstatus(e.target.value)}>
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

            {/* Table Body */}
            <table className="w-full border-collapse rounded-lg">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Driver Name</th>
                  <th className="py-3 px-4 text-left">Driver Status</th>
                  <th className="py-3 px-4 text-left">Contact Number</th>
                  <th className="py-3 px-4 text-left">License Number</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">Action</th>
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
                      <td className="py-4 px-4">{trip.name}</td>
                      <td className="py-4 px-4">
                        {trip.driver_status == 2
                          ? "Maintenance"
                          : trip.driver_status ==0
                            ? "Went to Trip"
                            : trip.driver_status ==1
                              ? "Available"
                              : "Unknown"}
                      </td>
                      <td className="py-4 px-4">{trip.contact_number}</td>
                      <td className="py-4 px-4">{trip.license_number}</td>
                      <td className="py-4 px-4">{trip.address}</td>
                      <td className="py-2 px-1">
                        <button
                          value={trip.id}
                          onClick={updateValue
                            
                          }
                          className="hover:rounded  cursor-pointer px-3 py-2 rounded-3xl text-white bg-neutral-800 transition-all duration-500"
                        >
                          Update
                        </button>
                        <button
                          value={trip.id}
                          onClick={deleteValue}
                          className="hover:rounded cursor-pointer px-3 py-2 rounded-3xl text-white bg-red-900 transition-all duration-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-6 text-center text-gray-500 text-lg">
                      No records found 🚫
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {isOpen && (
            <>
              {/* Backdrop with Blur */}
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
                    maxWidth: "40rem", // Increased width
                    width: "90%", // Adjusted for responsiveness
                    maxHeight: "80vh", // Added max height for scrollability
                    overflowY: "auto", // Enables scrolling
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
                    <h3 className="text-xl font-semibold text-gray-800">Add Driver Details</h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none text-4xl cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Modal Body (Form) */}
                  <form onSubmit={handleSubmit}>
                    <fieldset>
                      {/* Driver Name */}
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Driver Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Driver Age */}
                      <div className="mb-4">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                          Driver Age
                        </label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Gender */}
                      <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                          Gender
                        </label>
                        <div className="radio-group mt-2 flex space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value="Male"
                              checked={formData.gender === "Male"}
                              onChange={handleChange}
                              className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                              required
                            />
                            <span className="ml-2 text-gray-700">Male</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value="Female"
                              checked={formData.gender === "Female"}
                              onChange={handleChange}
                              className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                              required
                            />
                            <span className="ml-2 text-gray-700">Female</span>
                          </label>
                        </div>
                      </div>

                      {/* Contact Number */}
                      <div className="mb-4">
                        <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          id="contact_number"
                          name="contact_number"
                          value={formData.contact_number}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* License Number */}
                      <div className="mb-4">
                        <label htmlFor="license_number" className="block text-sm font-medium text-gray-700">
                          License Number
                        </label>
                        <input
                          type="text"
                          id="license_number"
                          name="license_number"
                          value={formData.license_number}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Address Line 1 */}
                      <div className="mb-4">
                        <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          id="address_line1"
                          name="address_line1"
                          value={formData.address_line1}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Address Line 2 */}
                      <div className="mb-4">
                        <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          id="address_line2"
                          name="address_line2"
                          value={formData.address_line2}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* City */}
                      <div className="mb-4">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* State */}
                      <div className="mb-4">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Pin Code */}
                      <div className="mb-4">
                        <label htmlFor="pin_code" className="block text-sm font-medium text-gray-700">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          id="pin_code"
                          name="pin_code"
                          value={formData.pin_code}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {formType}
                      </button>
                    </fieldset>
                  </form>
                </div>
              </div>
            </>
          )}

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
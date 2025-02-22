import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
  function closeAlert() {
    setMessage("");
  }
  const [userRole, setUserRole] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if(sessionStorage.getItem("tokken")) {
      navigate("/home");
    }
  }, [navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    axios
      .post("http://localhost/project2/api/login_api.php", {
        Email: userRole,
        Password: password,
      })
      .then((response) => {
        if (response.data.status === "success") {
          sessionStorage.setItem("tokken", btoa(response.data.access_token));
          sessionStorage.setItem("role", btoa(userRole));
          navigate("/home");
        } else {
          setMessage("Wrong Credentials");
        }
      });
  };
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url("https://files.oaiusercontent.com/file-4sbGFh9mU8ZMUpfZ2JSdZG?se=2025-02-21T05%3A50%3A34Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D87238c77-94aa-4c90-90ea-4afa22c8851d.webp&sig=OjkZf2cJB1tYg5LHXbXokiCzxyFPVy5VjoUy6ysYHzE%3D")`,
      }}
    >
      <div className="relative z-1 bg-black p-8 rounded-3xl shadow-black shadow-2xl w-96 -mt-65">
        {" "}
        {message && (
          <div className="relative text-white text-lg bg-red-600 p-4 rounded-md mb-4">
            <span
              className="absolute top-2 right-4 cursor-pointer text-2xl hover:bg-red-700 px-2 rounded"
              onClick={closeAlert}
            >
              &times;
            </span>
            {message}
          </div>
        )}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-300">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4" method="POST">
          {/* User Role Selection */}
          <div>
            <label
              htmlFor="userRole"
              className="block text-sm font-medium text-gray-300"
            >
              User Role
            </label>
            <select
              id="userRole"
              name="userRole"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
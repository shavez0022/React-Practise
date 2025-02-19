import { useState } from 'react'
import './login.css'
import axios from "axios";

export function Login() {
    const [userRole, setUserRole] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
       axios
    .post("http://localhost/project2/api/login_api.php", {'Email': userRole,'Password': password})
    .then((response) => {
      
      if (response.data.status === "success") {
        console.log('done');
      }})
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4" method='POST'>

                    <div>
                        <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">User Role</label>
                        <select
                            id="userRole"
                            name="userRole"
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                            required
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-6 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                </div>
        </div>
    );
} 

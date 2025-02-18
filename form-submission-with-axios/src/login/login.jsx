import React from 'react';
import './login.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [userRole, setUserRole] = useState("");
    const [password, setPassword] = useState("");
   
    return (
        <>
      <div className="container">
            <div className="login-container">
                <h2>Login</h2>
                <form method='GET'>
                    <div className="input-group">
                        <label htmlFor="userRole">User Role</label>
                        <input 
                            type="text" 
                            id="userRole" 
                            name="userRole" 
                            placeholder="Enter your user role" 
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
</>
);
};
export default Login;
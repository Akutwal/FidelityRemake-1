import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import fidelityTextBig from "../images/fidelity-text-big.png";

function Login({ onLogin }) { // Accept onLogin as a prop
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        onLogin(); // Call the onLogin function to update the login state
        navigate("/stocks"); // Navigate to the Stocks page
    };

    return (
        <div className="login-container">
            <div id="fidelity-logo-big">
                <img src={fidelityTextBig} alt="Fidelity Logo" />
            </div>
            <div id="loginform">
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
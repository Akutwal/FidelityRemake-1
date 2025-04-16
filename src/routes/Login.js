import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import fidelityTextBig from "../images/fidelity-text-big.png";
import envelopeIcon from "../images/envelope-icon.png"; // Import the envelope icon
import peopleIcon from "../images/people-icon.png"; // Import the people icon

function Login({ onLogin }) {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        onLogin(); // Call the onLogin function to update the login state
        navigate("/stocks"); // Navigate to the Stocks page
    };

    const handleForgotPassword = () => {
        alert("Forgot Password functionality not implemented yet!"); // Placeholder action
    };

    return (
        <div className="login-container">
            <div id="fidelity-logo-big">
                <img src={fidelityTextBig} alt="Fidelity Logo" />
            </div>
            <div id="loginform">
                <img src={peopleIcon} alt="People Icon" className="people-icon" /> {/* Add the people icon */}
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <div className="remember-me">
                        <input type="checkbox" id="remember-me" name="remember-me" />
                        <label htmlFor="remember-me">Remember Me</label>
                        <button
                            type="button"
                            className="envelope-button"
                            onClick={handleForgotPassword}
                        >
                            <img src={envelopeIcon} alt="Envelope Icon" className="envelope-icon" />
                        </button>
                        <span className="forgot-password-text">Forgot Password</span>
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
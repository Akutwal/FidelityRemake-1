import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./PersonalInfo.css";

function PersonalInfo({ onLogin, isLoggedIn, handleLogout, fidelityLogo }) { // Accept onLogin, isLoggedIn, handleLogout, and fidelityLogo as props
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(); // Update the login state
        navigate("/stocks"); // Redirect to the Stocks page
    };

    return (
    <div>
        <h1 id="personalinfoheader">Personal Info</h1>
        <div className="personal-info-container">
            <form className="personal-info-form" onSubmit={handleSubmit}>
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" name="first-name" required />
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" name="last-name" required />
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" required />
                <label htmlFor="ssn">SSN</label>
                <input type="text" id="ssn" name="ssn" required />
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" required />
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" required />
                <label htmlFor="state">State</label>
                <input type="text" id="state" name="state" required />
                <label htmlFor="zip">Zip Code</label>
                <input type="text" id="zip" name="zip" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>

    );
}

export default PersonalInfo;
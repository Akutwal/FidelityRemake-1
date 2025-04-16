import React from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalInfo.css"; // Optional: Add a CSS file for styling

function PersonalInfo() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/stocks"); // Redirect to the Stocks page
    };

    return (
        <div className="personal-info-container">
            <h1>Personal Information</h1>
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
    );
}

export default PersonalInfo;
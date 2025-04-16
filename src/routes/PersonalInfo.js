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
        <div className="personal-info-container">
            <nav className="navbar"> 
                <Link to={isLoggedIn ? "/stocks" : "/"}>
                    <img src={fidelityLogo} className="fidelity-logo" alt="Fidelity Logo" />
                </Link>  
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="nav-link"><h3>Profile</h3></Link> <h3> | </h3>
                        <Link to="/advising" className="nav-link"><h3>Advising</h3></Link> <h3> | </h3>
                        <Link to="/news" className="nav-link"><h3>News & Research</h3></Link> <h3> | </h3>
                        <Link to="/why-fidelity" className="nav-link"><h3>Why Fidelity?</h3></Link> <h3> | </h3>
                        <button className="nav-link logout-button" onClick={handleLogout}>
                            <h3>Log Out</h3>
                        </button>
                    </>
                ) : (
                    <>
                        <span className="nav-link disabled"><h3>Profile</h3></span> <h3> | </h3>
                        <span className="nav-link disabled"><h3>Advising</h3></span> <h3> | </h3>
                        <span className="nav-link disabled"><h3>News & Research</h3></span> <h3> | </h3>
                        <Link to="/why-fidelity" className="nav-link"><h3>Why Fidelity?</h3></Link>
                    </>
                )}
                <div className="search-wrapper">
                    <input type="search" placeholder="Search"></input>
                </div>
            </nav>
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
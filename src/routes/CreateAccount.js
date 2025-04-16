import React from "react";
import { useNavigate } from "react-router-dom";
import './CreateAccount.css';

function CreateAccount() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/personal-info"); // Redirect to the PersonalInfo page
    };

    return (
        <div className="create-account-container">
            <h1>Create Account</h1>
            <div className="container">
                <form className="create-account-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="name">Username</label>
                    <input type="text" id="name" name="name" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <label htmlFor="password-confirm">Confirm Password</label>
                    <input type="password" id="password-confirm" name="confirm-password" required />
                    <button type="submit">Next</button>
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;
import React, { useState } from "react";
import "./Profile.css";
import ProfileAvatar from '../images/Layer 2.png';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState("@JFlannigan130");
    const [amount, setAmount] = useState("");
    const [totalFidelity, setTotalFidelity] = useState(530.44); // Initial Total in Fidelity
    const [totalIndividualValue, setTotalIndividualValue] = useState(527.46); // Initial Total individual value
    const [individualCash, setIndividualCash] = useState(1.52); // Initial Individual cash

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        // Allow only numbers and a single decimal point
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setAmount(value);
        }
    };

    const handleTransfer = (e) => {
        e.preventDefault();
        const transferAmount = parseFloat(amount);

        if (transferAmount > 1.0) {
            // Update the Total in Fidelity, Total individual value, and Individual cash
            setTotalFidelity((prev) => prev + transferAmount);
            setTotalIndividualValue((prev) => prev + transferAmount);
            setIndividualCash((prev) => prev + transferAmount);

            // Reset the amount input field
            setAmount("");
            alert(`$${transferAmount.toFixed(2)} has been transferred to your account.`);
        } else {
            alert("Please enter an amount greater than $1.00.");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-info">
                    <div className="profile-avatar">
                        <img src={ProfileAvatar} alt="Profile Avatar" />
                    </div>
                    <div className="profile-details">
                        <h2>John Flannigan</h2>
                        {isEditing ? (
                            <input
                                type="text"
                                value={username}
                                onChange={handleInputChange}
                                className="edit-username-input"
                            />
                        ) : (
                            <p>{username} · Joined 2021</p>
                        )}
                        {isEditing ? (
                            <button onClick={handleSaveClick} className="save-profile">
                                Save
                            </button>
                        ) : (
                            <a href="#" onClick={handleEditClick} className="edit-profile">
                                Edit profile
                            </a>
                        )}
                    </div>
                </div>
                <div className="profile-transfer">
                    <h3>Transfer money</h3>
                    <form onSubmit={handleTransfer}>
                        <label>Amount</label>
                        <div className="amount-input-box">
                            <span className="dollar-symbol">$</span>
                            <input
                                type="text"
                                placeholder="Enter Amount"
                                value={amount}
                                onChange={handleAmountChange}
                            />
                        </div>
                        <label>From</label>
                        <select>
                            <option>Choose Account</option>
                            <option>Fidelity Account</option>
                        </select>
                        <label>To</label>
                        <select>
                            <option>Choose Account</option>
                            <option>Account Ending-1760</option>
                        </select>
                        <button type="submit" className="transfer-button">Transfer</button>
                    </form>
                </div>
            </div>
            <div className="profile-balance">
                
                <div className="Total"> 
                <h1>${totalFidelity.toFixed(2)}</h1>
                     <p>Total in Fidelity</p></div>
            </div>
            <div className="profile-content">
                <div className="profile-investing">
                    <h3>Individual investing</h3>
                    <hr />
                    <p>Total individual value <span>${totalIndividualValue.toFixed(2)}</span></p>
                    <p>Individual holdings <span>$525.96</span></p>
                    <p>Individual cash <span>${individualCash.toFixed(2)}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
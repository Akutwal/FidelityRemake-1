import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Profile.css";

function Profile() {
    return (
        <div className="profile">
            <h1>Profile</h1>
            <p>Profile stuff</p>
        </div>
    ); 
}

export default Profile;
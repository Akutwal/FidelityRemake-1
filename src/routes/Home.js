import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import fidelityLogo from '../images/fidelity-logo-circle.png';
import homeLargePic from '../images/Female Investors.svg';
import "./Home.css";

function Home() {
return (
    <div className="home"> 
        <div>
            <h2>Your goals, your future, your way</h2>
            <img src={homeLargePic} style={{width: '25em', height: '25em'}} />
        </div>
        <div style={{paddingTop: '8em'}}>
            <button className="home-buttons">Create account</button>
            <div style={{height: '2em'}}></div>
            <button className="home-buttons">Login</button>
            <div style={{height: '2em'}}></div>
            <h2>You've got goals. We've got solutions.</h2>
        </div>

    </div>
)
}

export default Home;
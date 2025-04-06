import React from 'react';
import './WhyFidelity.css';
import whyFidelityData from '../api/whyFidelityAPI';
import fidelityLogo from '../images/image 7.png'; // Adjust the path to your logo image

function WhyFidelity() {
  const { title, content } = whyFidelityData;

  return (
    <div className="why-container">
      <h1 className="why-title">
        <span className="why-title-black">We are</span>{' '}
        <img src={fidelityLogo} alt="Fidelity Logo" className="why-title-logo" />
      </h1>
      <div className="why-box">
        <p>{content[0]}</p>
        <h2 className="why-subtitle">{content[1]}</h2>
        <p>{content[2]}</p>
        <p>{content[3]}</p>
        <p>{content[4]}</p>
      </div>
    </div>
  );
}

export default WhyFidelity;
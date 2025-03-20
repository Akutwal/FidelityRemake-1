import './App.css';
import fidelityLogo from './images/fidelity-logo-circle.png';
import {useEffect} from 'react';
import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import searchIcon from './images/search-icon.png';
import Home from './routes/Home';
import Profile from './routes/Profile';
import WhyFidelity from './routes/WhyFidelity';
import News from './routes/News';
import Advising from './routes/Advising';

function App() {

  useEffect(() => {
    document.title = "Fidelity Investments";
  }, [])

  return (
    <Router>
    <nav className="navbar"> 
          <Link to="/">
          <img src={fidelityLogo} className="fidelity-logo" alt="Fidelity Logo" />
          </Link>  
          <Link to="/profile" className="nav-link" ><h3>Profile</h3></Link> <h3> | </h3>
          <Link to="/advising" className="nav-link" ><h3>Advising</h3></Link> <h3> | </h3>
          <Link to="/news" className="nav-link" ><h3>News & Research</h3></Link> <h3> | </h3>
          <Link to="/why-fidelity" className="nav-link" ><h3>Why Fidelity?</h3></Link>  <h3> | </h3>
      <div className="search-wrapper">
        <input type="search"></input>
      </div>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/advising" element={<Advising />} />
          <Route path="/news" element={<News />} />
          <Route path="/why-fidelity" element={<WhyFidelity />} />
        </Routes>
      </div>
      </Router>

  );
}

export default App;

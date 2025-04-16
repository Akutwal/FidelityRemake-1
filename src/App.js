import './App.css';
import fidelityLogo from './images/fidelity-logo-circle.png';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { EventProvider } from './context/EventContext'; 
import Home from './routes/Home';
import Profile from './routes/Profile';
import WhyFidelity from './routes/WhyFidelity';
import News from './routes/News';
import Advising from './routes/Advising';
import NewAdvising from './routes/NewAdvising'; 
import ScheduledEvents from './routes/ScheduledEvents';
import AttendEvent from './routes/AttendEvent';
import CreateAccount from './routes/CreateAccount';
import Login from './routes/Login';
import Stocks from './routes/Stocks';
import StockPage from './routes/stockpage';
import PersonalInfo from './routes/PersonalInfo'; // Import the PersonalInfo component

function App({ navigate }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = "Fidelity Investments";
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/"); // Redirect to the Home page after logout
  };

  return (
    <EventProvider>
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
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/advising/details" element={<NewAdvising />} /> {/* Specific route first */}
          <Route path="/advising" element={<Advising />} /> {/* General route after */}
          <Route path="/news" element={<News />} />
          <Route path="/why-fidelity" element={<WhyFidelity />} />
          <Route path="/scheduled-events" element={<ScheduledEvents />} />
          <Route path="/attend-event" element={<AttendEvent />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/personal-info" element={<PersonalInfo />} /> {/* Add this route */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/stocks" element={<Stocks onLogout={handleLogout} />} />
          <Route path="/stocks/:symbol" element={<StockPage />} />
        </Routes>
      </div>
    </EventProvider>
  );
}

function AppWrapper() {
  const navigate = useNavigate(); // Use navigate here and pass it to App
  return <App navigate={navigate} />;
}

export default function Root() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
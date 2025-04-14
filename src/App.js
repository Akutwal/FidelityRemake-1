import './App.css';
import fidelityLogo from './images/fidelity-logo-circle.png';
import { useEffect, useState } from 'react'; // Import useState
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
import Stocks from './routes/Stocks'; // Import the Stocks component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    document.title = "Fidelity Investments";
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set login state to false
  };

  return (
    <EventProvider>
      <Router>
        <nav className="navbar"> 
          <Link to={isLoggedIn ? "/stocks" : "/"}> {/* Dynamically change the link */}
            <img src={fidelityLogo} className="fidelity-logo" alt="Fidelity Logo" />
          </Link>  
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="nav-link"><h3>Profile</h3></Link> <h3> | </h3>
              <Link to="/advising" className="nav-link"><h3>Advising</h3></Link> <h3> | </h3>
              <Link to="/news" className="nav-link"><h3>News & Research</h3></Link> <h3> | </h3>
            </>
          ) : (
            <>
              <span className="nav-link disabled"><h3>Profile</h3></span> <h3> | </h3>
              <span className="nav-link disabled"><h3>Advising</h3></span> <h3> | </h3>
              <span className="nav-link disabled"><h3>News & Research</h3></span> <h3> | </h3>
            </>
          )}
          <Link to="/why-fidelity" className="nav-link"><h3>Why Fidelity?</h3></Link>  <h3> | </h3>
          <div className="search-wrapper">
            <input type="search"></input>
          </div>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/advising" element={<Advising />} />
            <Route path="/advising/details" element={<NewAdvising />} /> 
            <Route path="/news" element={<News />} />
            <Route path="/why-fidelity" element={<WhyFidelity />} />
            <Route path="/scheduled-events" element={<ScheduledEvents />} />
            <Route path="/attend-event" element={<AttendEvent />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Pass login handler */}
            <Route path="/stocks" element={<Stocks onLogout={handleLogout} />} /> {/* Pass logout handler */}
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;


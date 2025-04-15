import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Advising.css';
import scheduledEventsIcon from '../images/image 6.jpg';
import learningEventIcon from '../images/image.jpg';
import advisingIcon from '../images/Vector.jpg';

function Advising() {
    const navigate = useNavigate();

    const handleScheduledEventsClick = () => {
        navigate('/scheduled-events');
    };

    const handleAttendEventClick = () => {
        navigate('/attend-event');
    };

    const handleAdvisingClick = () => {
        console.log('Navigating to /advising/details');
        navigate('/advising/details'); // Correct route for the new advising page
    };

    return (
        <div className="advising-container">
            <div className="advising-content">
                <h1>Welcome! We’re here to help - you choose how.</h1>
                <p>Schedule an event by choosing a date and time through our booking system. View your upcoming events in My Events or call us at 800-642-7131 for assistance!</p>
                <div className="advising-options">
                    <div className="option" onClick={handleScheduledEventsClick}>
                        <img src={scheduledEventsIcon} alt="Scheduled Events" />
                        <p>See my scheduled events</p>
                    </div>
                    <div className="option" onClick={handleAttendEventClick}>
                        <img src={learningEventIcon} alt="Learning Event" />
                        <p>Attend a learning event</p>
                    </div>
                    <div className="option" onClick={handleAdvisingClick}>
                        <img src={advisingIcon} alt="Advising" />
                        <p>Advising</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Advising;
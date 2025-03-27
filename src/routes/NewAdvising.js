import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { EventContext } from '../context/EventContext';
import './NewAdvising.css';

function NewAdvising() {
    const { addScheduledEvent } = useContext(EventContext);

    // State to manage available advisors
    const [advisors, setAdvisors] = useState([
        { name: 'Emily Smith', role: 'Stock Broker', day: 'Monday', time: '11:00 - 12:30' },
        { name: 'John Crane', role: 'Stock Broker', day: 'Thursday', time: '1:00 - 2:30' }
    ]);

    const handleScheduleClick = (advisorName, day, time) => {
        const newEvent = {
            id: Date.now(), // Generate a unique ID
            title: `Advising with ${advisorName}`,
            date: day,
            time: time,
            location: 'Online Meeting'
        };
        addScheduledEvent(newEvent);

        // Remove the scheduled advisor from the list
        setAdvisors(advisors.filter(advisor => advisor.name !== advisorName));
    };

    return (
        <div className="new-advising-container">
            <div className="new-advising-content">
                <h1>Advising Appointments</h1>
                <p>
                    To schedule an advising meeting with Fidelity about stocks, simply reach out via our scheduling platform or contact us directly. Let us know your specific interests, such as investment strategies or portfolio management, and provide a few available time slots. We’ll confirm your meeting and ensure you’re prepared to get the most out of your session.
                </p>
                <h2>Schedule Appointments</h2>
                <div className="content-wrapper">
                    <div className="advisors-list">
                        {advisors.map(advisor => (
                            <div className="advisor" key={advisor.name}>
                                <p><strong>{advisor.name}</strong></p>
                                <p>{advisor.role}</p>
                                <p>{advisor.day}</p>
                                <p>{advisor.time}</p>
                                <button
                                    className="schedule-button"
                                    onClick={() => handleScheduleClick(advisor.name, advisor.day, advisor.time)}
                                >
                                    Schedule
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="action-buttons">
                        <Link to="/attend-event"> {/* Navigate to Attend Event page */}
                            <button className="action-button">Attend a learning event</button>
                        </Link>
                        <Link to="/scheduled-events"> {/* Navigate to Scheduled Events page */}
                            <button className="action-button">Scheduled Advising</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewAdvising;
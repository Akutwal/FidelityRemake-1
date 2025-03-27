import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { EventContext } from '../context/EventContext';
import './ScheduledEvents.css';

function ScheduledEvents() {
    const { scheduledEvents } = useContext(EventContext);
    const [localScheduledEvents, setLocalScheduledEvents] = useState(scheduledEvents);

    const cancelEvent = (id) => {
        setLocalScheduledEvents(localScheduledEvents.filter(event => event.id !== id));
    };

    return (
        <div className="scheduled-events-container">
            <div className="scheduled-events-content">
                <h1>Scheduled Events</h1>
                <p>Check your calendar to stay on top of upcoming learning events. These sessions are a great way to build your skills, stay informed, and network. Be sure to review the topics in advance to get the most out of each event.</p>
                <div className="events-list">
                    {localScheduledEvents.map(event => (
                        <div className="event" key={event.id}>
                            <h2>{event.title}</h2>
                            <p>{event.date}<br />{event.time} at {event.location}</p>
                            <button className="cancel-button" onClick={() => cancelEvent(event.id)}>Cancel</button>
                        </div>
                    ))}
                </div>
                <div className="event-buttons">
                    <Link to="/attend-event">
                        <button className="event-button">Attend an Event</button>
                    </Link>
                    <Link to="/advising/details"> {/* Updated route */}
                        <button className="event-button">Advising</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ScheduledEvents;
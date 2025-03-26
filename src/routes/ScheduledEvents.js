import React, { useState } from 'react';
import './ScheduledEvents.css';

function ScheduledEvents() {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'The Stock Traders Expo',
            date: 'Thursday, 20 February 2025',
            time: '2:00 - 4:30 pm',
            location: 'Main Floor, 928 E Avenue'
        },
        {
            id: 2,
            title: 'Investing Conference',
            date: 'Monday, 29 July 2025',
            time: '12:00 - 1:30 pm',
            location: '3rd Floor, 1232 W Providence'
        }
    ]);

    const handleCancelClick = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div className="scheduled-events-container">
            <div className="scheduled-events-content">
                <h1>Scheduled Events</h1>
                <p>Check your calendar to stay on top of upcoming learning events. These sessions are a great way to build your skills, stay informed, and network. Be sure to review the topics in advance to get the most out of each event.</p>
                <div className="events-list">
                    {events.map(event => (
                        <div className="event" key={event.id}>
                            <h2>{event.title}</h2>
                            <p>{event.date}<br />{event.time} at {event.location}</p>
                            <button className="cancel-button" onClick={() => handleCancelClick(event.id)}>Cancel</button>
                        </div>
                    ))}
                </div>
                <div className="event-buttons">
                    <button className="event-button">Attend an Event</button>
                    <button className="event-button">Advising</button>
                </div>
            </div>
        </div>
    );
}

export default ScheduledEvents;
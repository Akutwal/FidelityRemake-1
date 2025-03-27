import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext'; // Import EventContext
import './AttendEvent.css';

function AttendEvent() {
    const { attendEvents, attendEvent } = useContext(EventContext); // Access context

    return (
        <div className="attend-event-container">
            <div className="attend-event-content">
                <h1>Attend Event</h1>
                <p>Attending a stock information event offers valuable insights into market trends, investment strategies, and economic influences on stock performance. Experts share tips on minimizing risks and maximizing returns, while networking with attendees provides diverse perspectives on investing.</p>
                <div className="content-wrapper">
                    <div className="events-list">
                        {attendEvents.map(event => (
                            <div className="event" key={event.id}>
                                <h2>{event.title}</h2>
                                <p>{event.date}<br />{event.time}<br />{event.location}</p>
                                <button className="attend-button" onClick={() => attendEvent(event.id)}>Attend</button>
                            </div>
                        ))}
                    </div>
                    <div className="action-buttons">
                        <Link to="/scheduled-events">
                            <button className="action-button">Scheduled Events</button>
                        </Link>
                        <Link to="/advising/details"> 
                            <button className="action-button">Advising</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttendEvent;
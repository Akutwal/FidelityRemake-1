import React from 'react';
import './AttendEvent.css';

function AttendEvent() {
    const events = [
        {
            id: 1,
            title: 'Annual Financial Planning Conference',
            date: 'Friday, 2 March 2025',
            time: '1:00 - 5:30 pm',
            location: '172 North Road'
        },
        {
            id: 2,
            title: 'Stocktoberfest',
            date: 'Wednesday, 1 October 2025',
            time: '10:00 am - 1:30 pm on 3rd Floor',
            location: '9483 Laggan Dr'
        }
    ];

    return (
        <div className="attend-event-container">
            <div className="attend-event-content">
                <h1>Attend Event</h1>
                <p>Attending a stock information event offers valuable insights into market trends, investment strategies, and economic influences on stock performance. Experts share tips on minimizing risks and maximizing returns, while networking with attendees provides diverse perspectives on investing.</p>
                <div className="events-list">
                    {events.map(event => (
                        <div className="event" key={event.id}>
                            <h2>{event.title}</h2>
                            <p>{event.date}<br />{event.time}<br />{event.location}</p>
                            <button className="attend-button">Attend</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AttendEvent;
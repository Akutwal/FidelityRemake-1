import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    // Initial events for "Attend Event"
    const [attendEvents, setAttendEvents] = useState([
        {
            id: 3,
            title: 'Annual Financial Planning Conference',
            date: 'Friday, 2 March 2025',
            time: '1:00 - 5:30 pm',
            location: '172 North Road'
        },
        {
            id: 4,
            title: 'Stocktoberfest',
            date: 'Wednesday, 1 October 2025',
            time: '10:00 am - 1:30 pm on 3rd Floor',
            location: '9483 Laggan Dr'
        }
    ]);

    // Existing scheduled events
    const [scheduledEvents, setScheduledEvents] = useState([
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

    // Function to move an event from "Attend Event" to "Scheduled Events"
    const attendEvent = (eventId) => {
        const eventToMove = attendEvents.find(event => event.id === eventId);
        if (eventToMove) {
            setAttendEvents(attendEvents.filter(event => event.id !== eventId));
            setScheduledEvents([...scheduledEvents, eventToMove]);
        }
    };

    return (
        <EventContext.Provider value={{ attendEvents, scheduledEvents, attendEvent }}>
            {children}
        </EventContext.Provider>
    );
};
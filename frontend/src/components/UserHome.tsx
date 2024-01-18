// UserHome.tsx

import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SmallCard from './SmallCard';
import Header from './Header';
import HomeImg from './HomeImg';
import Message from './Message';
import { Event } from './interfaces/Event';
import '../style/cardContainer.css';

const baseURL: string = 'http://localhost:8090';

function UserHome() {
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term: string) => {
        setSearchTerm(term);

        if (term.trim() === '') {
            // If the search term is empty, show all events
            setFilteredEvents(events);
        } else {
            // Perform the filtering based on the search term and all fields
            const filtered = events.filter((event) =>
                Object.values(event).some((value) =>
                    value.toString().toLowerCase().includes(term.toLowerCase())
                )
            );

            setFilteredEvents(filtered);
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${baseURL}/events/all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    redirect: 'follow',
                });

                if (response.status !== 302) {
                    console.error('Error fetching events:', response.status, response.statusText, await response.text());
                    return;
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setEvents(data);
                    // Initially, show all events
                    setFilteredEvents(data);
                } else {
                    console.error('Unexpected data format for events:', data);
                }
            } catch (error) {
                console.error('An unexpected error occurred:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <Header />
            <main className="col-12 container-img-cards">
                <Message />
                <HomeImg />
                <SearchBar onSearch={handleSearch} />
                <div className="cards-container1">
                    {filteredEvents.map((event) => (
                        <SmallCard key={event.id} event={event} />
                    ))}
                </div>
            </main>
        </>
    );
}

export default UserHome;

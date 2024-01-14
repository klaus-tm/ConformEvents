import Message from "./Message.tsx";
import React, { useEffect, useState } from "react";
import SmallCard from "./SmallCard.tsx";
import Header from "./Header.tsx";
import HomeImg from "./HomeImg.tsx";
const baseURL: string = "http://localhost:8090";
import {Event} from "./interfaces/Event.ts";
function UserHome() {
    // upload events
    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${baseURL}/events/all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow'
                });

                if (response.status !== 302) {
                    console.error('Error fetching events:', response.status, response.statusText, await response.text());
                    return;
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setEvents(data);
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
            <Header/>
            <main className="col-12 container-img-cards">
                <Message />
                <HomeImg />
                <div className="cards-container1">
                    {events.map((event) => (
                        <SmallCard key={event.id} event={event} />
                    ))}
                </div>
            </main>
        </>
    );
}

export default UserHome;

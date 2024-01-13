import Message from "./Message.tsx";
import React, { useEffect, useState } from "react";
import SmallCard from "./SmallCard.tsx";
import Header from "./Header.tsx";
import HomeImg from "./HomeImg.tsx";
import ParticipantsList from "./ParticpantsList.tsx";
import VolunteersList from "./VolunteesList.tsx";
const baseURL: string = "http://localhost:8090";
interface Event {
    id: number;
    name: string;
    cityRegion: string;
    date: string;
    description: string;
    raceMap: string;
    racePrices: string;
    raceTypes: string;
    registerLimit: string;
    startHours: string;
    volunteersNumber: number;
    organizer: number;
}
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
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.type === 'Organiser'){

        }
    }
    return (
        <div>
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
        </div>
    );
}

export default UserHome;

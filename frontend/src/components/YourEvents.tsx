import Header from "./Header.tsx";
import {useEffect, useState} from "react";
import SmallCard from "./SmallCard.tsx";
const baseURL: string = "http://localhost:8090";
import {Event} from "./interfaces/Event.ts";
function YourEvents() {
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const storedUserData = localStorage.getItem('userData');
    useEffect(() => {
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            const fetchEvents = async () => {
                try {
                    const response = await fetch(`${baseURL}/events?organizer=` + userData.id, {
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
                        const currentDate = new Date();

                        const past: Event[] = [];
                        const upcoming: Event[] = [];
                        const current: Event[] = [];

                        data.forEach((event) => {
                            const eventDate = new Date(event.date);
                            const registerLimitDate = new Date(event.registerLimit);

                            if (currentDate > eventDate) {
                                past.push(event);
                            } else if (currentDate < registerLimitDate) {
                                upcoming.push(event);
                            } else {
                                current.push(event);
                            }
                        });

                        setPastEvents(past);
                        setUpcomingEvents(upcoming);
                        setCurrentEvents(current);
                    } else {
                        console.error('Unexpected data format for events:', data);
                    }

                    setLoading(false);
                } catch (error) {
                    console.error('An unexpected error occurred:', error);
                }
            };

            fetchEvents();
        }
    }, [storedUserData]);
    return (
        <>
            <Header />
            <main>
                <div className="cards-container1">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <h3>Upcoming Events</h3>
                            {upcomingEvents.length > 0 ? (
                                <>
                                    <div className="cards-container1">
                                        {upcomingEvents.map((event) => (
                                            <SmallCard key={event.id} event={event} />
                                        ))}
                                    </div>
                                </>) :
                                <div>No data to print.</div>
                            }
                            <h3>Current Events</h3>
                            {currentEvents.length > 0 ? (
                                <>
                                    <div className="cards-container1">
                                        {currentEvents.map((event) => (
                                            <SmallCard key={event.id} event={event} />
                                        ))}
                                    </div>
                                </>
                            ) : <div>No data to print.</div>}
                            <h3>Past Events</h3>
                            {pastEvents.length > 0 ? (
                                <>
                                    <div className="cards-container1">
                                        {pastEvents.map((event) => (
                                            <SmallCard key={event.id} event={event} />
                                        ))}
                                    </div>
                                </>
                            ) : <div>No data to print.</div>}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
export default YourEvents;
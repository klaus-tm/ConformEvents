import Header from "./Header.tsx";
import React, {useEffect, useState} from "react";
import ParticipantsList from "./ParticpantsList.tsx";
import VolunteersList from "./VolunteesList.tsx";
import {useParams} from "react-router-dom";
import {Event} from "./interfaces/Event.ts";
const baseURL: string = "http://localhost:8090";
import { formatDate } from './functions/FormatDate';
function splitString(inputString: string) {
    if (inputString)
        return inputString.split('*');
     else
        return [];
}
function ExtendedCard() {
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    let x = null;
    useEffect(() => {
        if (id) {
            //get the event data
            const fetchEvents = async () => {
                try {
                    const response = await fetch(`${baseURL}/events/` + id, {
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

                    const eventData = await response.json();
                    setEvent(eventData);
                    console.log(event);
                    if(event) {
                        const prices = splitString(event.racePrices);
                        const types = splitString(event.raceTypes);
                        const [counts, setCounts] = useState(prices.map(() => 0));
                        const [totalSum, setTotalSum] = useState(0);
                        const handleIncrement = (index: number) => {
                            const updatedCounts = [...counts];
                            updatedCounts[index]++;
                            setCounts(updatedCounts);
                            updateTotalSum(updatedCounts);
                        };
                        const handleDecrement = (index: number) => {
                            const updatedCounts = [...counts];
                            if (updatedCounts[index] > 0) {
                                updatedCounts[index]--;
                                setCounts(updatedCounts);
                                updateTotalSum(updatedCounts);
                            }
                        };
                        const updateTotalSum = (updatedCounts: number[]) => {
                            const newTotalSum = prices.reduce((acc, price, index) => acc + parseFloat(price) * updatedCounts[index], 0);
                            setTotalSum(newTotalSum);
                        };

                        // get the user date
                        const storedUserData = localStorage.getItem('userData');
                        // console.log('*', storedUserData);
                        if (storedUserData) {
                            //user log
                            const userData = JSON.parse(storedUserData);
                            console.log(userData);
                            if (userData.type === 'Participant') {
                                // see the prices
                                const pricesElement = prices.map((price, index) => (
                                    <div key={index} className="price-card horizontal">
                                        <div className="price-and-type">
                                            Race type: {types[index]}. Price: {price}.
                                        </div>
                                        <button className="btn-form2 ext-card-button1"
                                                onClick={() => handleIncrement(index)}>
                                            +
                                        </button>
                                        <div id="count">{counts[index]}</div>
                                        <button className="ext-card-button1" onClick={() => handleDecrement(index)}>
                                            -
                                        </button>
                                    </div>
                                ));
                                x = (<>
                                    {pricesElement}
                                    <div className="horizontal">
                                        Total payment: <div id="sum">{totalSum}</div>
                                    </div>
                                    <button className="ext-card-button3">
                                        Pay
                                    </button>
                                </>);
                            } else if (userData.type === 'Volunteers') {
                                x = (
                                    <>
                                        <div className="ext-card-detalies">Volunteers
                                            needed: {event.volunteersNumber}</div>
                                        {event.volunteersNumber > 0 ? (
                                            <button className="ext-card-button3">Submit</button>
                                        ) : (
                                            <h6>There are no more places for volunteers.</h6>
                                        )}
                                    </>
                                );
                            }
                        }
                    }
                } catch (error) {
                    console.error('An unexpected error occurred:', error);
                }
            };
            fetchEvents();
        }
    }, [id]);

    return (
        <div>
            <Header />
            {event ? (
                <div className="ext-card-conteiner">
                    <div className="ext-card">
                        <div className="content">
                            <div className="ext-card-name">{event.name}</div>
                            <div className="ext-card-organizer">
                                Organized by: {event.organizer ? `${event.organizer.firstName} ${event.organizer.lastName}` : 'Unknown'}
                            </div>
                            <div className="ext-card-detalies">Location: {event.cityRegion}</div>
                            <div className="ext-card-detalies">Registration deadline: {formatDate(event.registerLimit)}</div>
                            <div className="ext-card-detalies">Date and time: {formatDate(event.date)}, {event.startHours}</div>
                            <div className="ext-card-detalies card-describe">{event.description}</div>
                            <div className="ext-card-detalies">
                                <a className="race-map-link" href={event.raceMap} target="_blank" rel="noopener noreferrer">See the starting point on the map.</a>
                            </div>
                            {x}
                            <ParticipantsList eventId={event.id}/>
                            <VolunteersList/>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>There is an error. Please try again later.</h1>
            )}
        </div>
    );
}


export default ExtendedCard;

import Header from "./Header.tsx";
import React, {useEffect, useState} from "react";
import ParticipantsList from "./ParticpantsList.tsx";
import VolunteersList from "./VolunteesList.tsx";
import {useParams} from "react-router-dom";
import {Event} from "./interfaces/Event.ts";
const baseURL: string = "http://localhost:8090";
import {formatDate, isDateLaterOrToday} from './functions/FormatDate';
function splitString(inputString: string) {
    if (inputString)
        return inputString.split('*');
     else
        return [];
}
function ExtendedCard() {
    const {id} = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    useEffect(() => {
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
            } catch (error) {
                console.error('An unexpected error occurred:', error);
            }
        };

        if (id) {
            fetchEvents();
        } else {
            alert('Error: Can\'t get the id of the event. Try again.');
        }
    }, [id]);

    const [prices, setPrices] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [counts, setCounts] = useState<number[]>([]);
    const [totalSum, setTotalSum] = useState(0);

    useEffect(() => {
        if (event) {
            const pricesList = splitString(event.racePrices);
            const typesList = splitString(event.raceTypes);
            setPrices(pricesList);
            setTypes(typesList);
        }
    }, [event]);
    useEffect(() => {
        setCounts(prices.map(() => 0));
        setTotalSum(0);
    }, [prices, types, event]);
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const isParticipant = storedUserData ? (userData.type === 'Participant') : null;
    const isVolunteer = storedUserData ? (userData.type === 'Volunteers') : null;
    const hasMorePrices = prices.length >= 2;
    const [selectedPriceIndex, setSelectedPriceIndex] = useState<number | null>(null);
    const handleRadioChange = (index: number) => {
        setSelectedPriceIndex(index);
    };
    const handleSubmitClick = async () => {
        if(event){
            const response = await fetch(baseURL + '/vpasses/check?event=' + event.id + '&volunteer=' + userData.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 404) {
                const userResponse = window.confirm("Are you sure?");
                if (userData && event && userResponse) {
                    const vpass = {
                        event: {id: event.id},
                        volunteer: {id: userData.id}
                    };

                    //Create vpass
                    const response1 = await fetch(baseURL + '/vpasses', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(vpass)
                    });
                    if (response1.status !== 201) {
                        throw new Error(`HTTP error! Status: ${response1.status}`);
                    } else {

                        // change the number of volunteers
                        event.volunteersNumber -= 1;
                        const response2 = await fetch(baseURL + '/events/' + event.id, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(event)
                        });
                        if (!response2.ok) {
                            throw new Error(`HTTP error! Status: ${response2.status}`);
                        } else {
                            alert("You signed up.");
                            window.location.reload();
                        }
                    }
                }
            }
            else alert('You already submitted to this event.');
        }


    }
    const handlePayClick = async () => {
        if(event) {

            const response = await fetch(baseURL + '/tickets/check?event=' + event.id + '&user=' + userData.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 404) {
                let selectedType;
                let selectedPrice;
                if (event) {
                    if (selectedPriceIndex !== null || !hasMorePrices) {
                        if (selectedPriceIndex !== null) {
                            selectedType = types[selectedPriceIndex];
                            selectedPrice = prices[selectedPriceIndex];
                        } else {
                            selectedType = splitString(event.raceTypes)[0];
                            selectedPrice = splitString(event.racePrices)[0];
                        }
                        const userResponse = window.confirm("Are you sure?");
                        if (userData && userResponse) {
                            const ticket = {
                                raceType: selectedType,
                                racePrice: selectedPrice,
                                event: {id: event.id},
                                user: {id: userData.id}
                            };
                            // console.log(ticket);
                            //Create ticket
                            const response1 = await fetch(baseURL + '/tickets', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(ticket)
                            });
                            if (response1.status !== 201) {
                                throw new Error(`HTTP error! Status: ${response1.status}`);
                            } else {
                                alert("You signed up.");
                                window.location.reload();
                            }
                        }
                    }
                    else
                        alert('Select a type of race before clicking Pay.');
                }
            }
            else alert('You already submitted to this event.');
        }
    };
    return (<>
        <Header/>
        <main>
        {event ? (
            <div className="ext-card-conteiner">
                <div className="ext-card">
                    <div className="content">
                        <div className="ext-card-name">{event.name}</div>
                        <div className="ext-card-organizer">
                            Organized
                            by: {event.organizer ? `${event.organizer.firstName} ${event.organizer.lastName}` : 'Unknown'}
                        </div>
                        <div className="ext-card-detalies">Location: {event.cityRegion}</div>
                        <div className="ext-card-detalies">Registration
                            deadline: {formatDate(event.registerLimit)}</div>
                        <div className="ext-card-detalies">Date and
                            time: {formatDate(event.date)}, {event.startHours}</div>
                        <div className="ext-card-detalies card-describe">{event.description}</div>
                        <div className="ext-card-detalies">
                            <a className="race-map-link" href={event.raceMap} target="_blank" rel="noopener noreferrer">See
                                the starting point on the map.</a>
                        </div>
                        {isVolunteer ? (
                            <>
                                <div className="ext-card-detalies">
                                    Volunteers needed: {event.volunteersNumber}
                                </div>
                                {event.volunteersNumber > 0 ?
                                    isDateLaterOrToday(event.registerLimit) ?
                                        <button className="ext-card-button3" id="submit"
                                                onClick={handleSubmitClick}>Submit</button>
                                        : <h6>The registration limit has passed.</h6>
                                    : <h6>There are no more places for volunteers.</h6>
                                }
                            </>
                        ) :(
                            isParticipant ?
                                isDateLaterOrToday(event.registerLimit) ?
                                    (
                                        <div className="ext-card-detalies">
                                            <div className="custom-radio">
                                                {prices.map((price, index) => (
                                                    <div className="horizontal" key={index}>
                                                        {hasMorePrices ? (
                                                            <input value={price} name="hopping" type="radio"
                                                               className="ext-card-radio" id={`radio${index}`}
                                                               onChange={() => handleRadioChange(index)}
                                                               checked={index === selectedPriceIndex}/>
                                                            ) : null}
                                                        <div className="price-and-type">Race
                                                            type: {types[index]}. Price: {price} lei.
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="ext-card-button3" id="pay" onClick={handlePayClick}>
                                                Pay
                                            </button>
                                        </div>
                                    ) : <h6>The registration limit has passed.</h6>
                                : null
                        )}
                        <ParticipantsList eventId={event.id}/>
                        <VolunteersList eventId={event.id}/>
                    </div>
                </div>
            </div>
        ) : (
            <h1>There is an error. Please try again later.</h1>
        )}
        </main>
    </>);
}


export default ExtendedCard;

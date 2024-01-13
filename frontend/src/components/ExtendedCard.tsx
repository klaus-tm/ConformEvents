import Header from "./Header.tsx";
import React, {useState} from "react";
import ParticipantsList from "./ParticpantsList.tsx";
import VolunteersList from "./VolunteesList.tsx";
import {useParams} from "react-router-dom";
// interface Organizer{
//     id: number;
//     firstName: string;
//     lastName: string;
//     mail: string;
//     phone: string;
// }
// interface Event {
//     id: number;
//     name: string;
//     cityRegion: string;
//     date: string;
//     description: string;
//     raceMap: string;
//     racePrices: string;
//     raceTypes: string;
//     registerLimit: string;
//     startHours: string;
//     volunteersNumber: number;
//     organizer: Organizer;
// }

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function splitString(inputString: string) {
    if (inputString)
        return inputString.split('*');
     else
        return [];
}

function ExtendedCard() {
    const { id } = useParams();
    console.log(id);

    let event = null;
    let x = null;
    // if (eventData) {
    //     event = JSON.parse(eventData) as Event;
    //     console.log(event);
    //     const prices = splitString(event.racePrices);
    //     const types = splitString(event.raceTypes);
    //     const [counts, setCounts] = useState(prices.map(() => 0)); // Inițializează un array de 0-uri cu aceeași lungime ca prices
    //     const [totalSum, setTotalSum] = useState(0);
    //     const handleIncrement = (index: number) => {
    //         const updatedCounts = [...counts];
    //         updatedCounts[index]++;
    //         setCounts(updatedCounts);
    //         updateTotalSum(updatedCounts);
    //     };
    //     const handleDecrement = (index: number) => {
    //         const updatedCounts = [...counts];
    //         if (updatedCounts[index] > 0) {
    //             updatedCounts[index]--;
    //             setCounts(updatedCounts);
    //             updateTotalSum(updatedCounts);
    //         }
    //     };
    //     const updateTotalSum = (updatedCounts: number[]) => {
    //         const newTotalSum = prices.reduce((acc, price, index) => acc + parseFloat(price) * updatedCounts[index], 0);
    //         setTotalSum(newTotalSum);
    //     };
    //     // get the user date
    //     const storedUserData = localStorage.getItem('userData');
    //     console.log(storedUserData);
    //     if (storedUserData) {
    //         const userData = JSON.parse(storedUserData);
    //         if (userData.type === 'Participant'){
    //             const pricesElement = prices.map((price, index) => (
    //                 <div key={index} className="price-card horizontal">
    //                     <div className="price-and-type">
    //                         Race type: {types[index]}. Price: {price}.
    //                     </div>
    //                     <button className="btn-form2 ext-card-button1" onClick={() => handleIncrement(index)}>
    //                         +
    //                     </button>
    //                     <div id="count">{counts[index]}</div>
    //                     <button className="ext-card-button1" onClick={() => handleDecrement(index)}>
    //                         -
    //                     </button>
    //                 </div>
    //             ));
    //
    //             x = (
    //                 <>
    //                     {pricesElement}
    //                     <div className="horizontal">
    //                     Total payment: <div id="sum">{totalSum}</div>
    //                     </div>
    //                     <button className="ext-card-button3">
    //                         Pay
    //                     </button>
    //                 </>
    //             );
    //         }
    //         else if (userData.type === 'Volunteers'){
    //             x = (
    //                 <>
    //                     <div className="ext-card-detalies">Volunteers needed: {event.volunteersNumber}</div>
    //                     {event.volunteersNumber > 0 && (
    //                         <button className="ext-card-button3">Submit</button>
    //                     )}
    //                 </>
    //             );
    //         }
    //     }
    // }

    return (
        <div>
            <Header />
            {event ? (
                <div className="ext-card-conteiner">

                        <div className="content">
                            <div className="ext-card-name">{event.name}</div>
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
            ) : (
                <h1>There is an error. Please try again later.</h1>
            )}
        </div>
    );
}


export default ExtendedCard;

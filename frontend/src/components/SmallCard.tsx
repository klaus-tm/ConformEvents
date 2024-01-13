import React from 'react';
import { useNavigate } from 'react-router-dom';

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

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
}

interface SmallCardProps {
    event: Event;
}

function SmallCard({ event }: SmallCardProps) {
    const currentDate = new Date();
    const registrationDeadline = new Date(event.registerLimit);
    if (!(currentDate < registrationDeadline)) {
        return null;
    }
    const navigate = useNavigate();

    const handleMoreInfoClick = () => {
        if (localStorage.getItem('userData') !== null) {
            // Navighează către ruta specificată cu trimiterea parametrilor de rutare
            navigate(`/event-details/${event.id}?name=${encodeURIComponent(event.name)}`);
        } else {
            alert('Please log in');
        }
    };
    const isUserLoggedIn = localStorage.getItem('userData') !== null;

    return (
        <div key={event.id} className="sm-card">
            <p className="sm-card-name">{event.name}</p>
            <p className="sm-card-location">Location: {event.cityRegion}</p>
            <p className="sm-card-deadline">Registration deadline: {formatDate(event.registerLimit)}</p>
            {isUserLoggedIn ? (
                <button className="sm-card-button" onClick={handleMoreInfoClick}>
                    More info
                </button>
            ) : (
                <button className="sm-card-button" onClick={handleMoreInfoClick}>
                    More info
                </button>
            )}
        </div>
    );
}

export default SmallCard;

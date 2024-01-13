import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Event} from "./interfaces/Event.ts";
import { formatDate } from './functions/FormatDate';
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
        navigate(`/event-details/${event.id}?name=${encodeURIComponent(event.name)}`);
    };
    return (
        <div key={event.id} className="sm-card">
            <p className="sm-card-name">{event.name}</p>
            <p className="sm-card-location">Location: {event.cityRegion}</p>
            <p className="sm-card-deadline">Registration deadline: {formatDate(event.registerLimit)}</p>

                <button className="sm-card-button" onClick={handleMoreInfoClick}>
                    More info
                </button>

        </div>
    );
}

export default SmallCard;

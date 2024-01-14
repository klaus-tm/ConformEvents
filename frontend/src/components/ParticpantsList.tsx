import React, {useEffect, useState} from 'react';
import { Ticket } from './interfaces/Ticket';
const baseURL: string = "http://localhost:8090";
interface ParticipantsListProps {
    eventId: number;
}

const ParticipantsList: React.FC<ParticipantsListProps> = (props) => {
    const { eventId } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [tickets, setTicket] = useState<Ticket[]>([]);
    const toggleAccordion = () => {setIsOpen(!isOpen);};
    useEffect(() => {
        const fetchEvents = async () => {
            //get the participants to an event
            try {
                const response = await fetch(`${baseURL}/tickets/event?event=${eventId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow'
                });

                if (response.status !== 302) {
                    console.error('Error fetching participants:', response.status, response.statusText, await response.text());
                    return;
                }
                else
                    setTicket(await response.json());
            } catch (error) {
                console.error('An unexpected error occurred:', error);
            }
        };

        fetchEvents();
    }, []);

    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const isOrganizier = storedUserData ?  (userData.type === 'Organiser') : null;
    return (
        <div className="accordion">
            <div className="accordion-header" onClick={toggleAccordion}>
                <h6>Participants List</h6>
            </div>
            {isOpen && (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            {isOrganizier ?
                                <th>Mail</th> :
                                null}
                            <th>Race type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id}>
                                <td>{ticket.user.firstName}</td>
                                <td>{ticket.user.lastName}</td>
                                {isOrganizier ?
                                    <td>{ticket.user.mail}</td> :
                                    null}
                                <td>{ticket.raceType}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ParticipantsList;

import React, {useEffect, useState} from 'react';
import {VPass} from "./interfaces/VPass.ts";
const baseURL: string = "http://localhost:8090";
interface VolunteersListProps {
    eventId: number;
}
const VolunteersList: React.FC<VolunteersListProps> = (props) => {
    const { eventId } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [vpasses, setVpasses] = useState<VPass[]>([]);
    const toggleAccordion = () => {setIsOpen(!isOpen);};

    useEffect(() => {
        const fetchEvents = async () => {
            //get the participants to an event
            try {
                const response = await fetch(`${baseURL}/vpasses/event?event=${eventId}`, {
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

                setVpasses(await response.json());
            } catch (error) {
                console.error('An unexpected error occurred:', error);
            }
        };

        fetchEvents();
    }, []);
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const isOrganizier = storedUserData ?  (userData.type === 'Organiser') : false;

    return (
        <div className="accordion">
            <div className="accordion-header" onClick={toggleAccordion}>
                <h6>Volunteers List</h6>
            </div>
            {isOpen && (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            {(isOrganizier && vpasses[0].event?.organizer?.id === userData.id) ? (
                                <>
                                    <th>Mail</th>
                                    <th>Phone number</th>
                                </>
                            ) : null}
                        </tr>
                        </thead>
                        <tbody>
                        {vpasses.map((vpass) => (
                            <tr key={vpass.id}>
                                <td>{vpass.volunteer.firstName}</td>
                                <td>{vpass.volunteer.lastName}</td>
                                {(isOrganizier && vpasses[0].event?.organizer?.id === userData.id) ? (
                                    <>
                                        <td>{vpass.volunteer.mail}</td>
                                        <td>{vpass.volunteer.phone}</td>
                                    </>
                                ) : null}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default VolunteersList;

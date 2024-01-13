import React, {useEffect, useState} from 'react';
const baseURL: string = "http://localhost:8090";

interface ParticipantsListProps {
    eventId: number;
}

const ParticipantsList: React.FC<ParticipantsListProps> = (props) => {
    // TODO
    const { eventId } = props;
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    let table = null;
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

                const data = await response.json();

            } catch (error) {
                console.error('An unexpected error occurred:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="accordion">
            <div className="accordion-header" onClick={toggleAccordion}>
                <h6>Participants List</h6>
            </div>
            {isOpen && (
                <div className="accordion-content">
                    <p>Conținutul Acordeonului va fi aici.</p>
                </div>
            )}
        </div>
    );
};

export default ParticipantsList;

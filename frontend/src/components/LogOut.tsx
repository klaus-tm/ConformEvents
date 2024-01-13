import Logo from "./Logo.tsx";
import LoginForm from "./LoginForm.tsx";
import React, {useEffect, useState} from "react";
import HomeImg from "./HomeImg.tsx";
import CreateOrganizator from "./CreateOrganizator.tsx";
import CAVool from "./CreateVolunteer.tsx";
import CreateParticipant from "./CreateParticipant.tsx";
import SmallCard from "./SmallCard.tsx";
import Message from "./Message.tsx";
const baseURL: string = "http://localhost:8090";
interface Event {
    id: number;
    name: string;
    cityRegion: string;
    date: string;
    description: string;
    raceMap: string;
    racePrice: number;
    raceType: string;
    registerLimit: string;
    startHour: string;
    volunteerNumber: number;
    organizer: number;
}
const LogOut: React.FC = () => {
    console.log('LogOut.tsx');

    const [showLogin, setShowLogin] = useState(false);
    const [showOrg, setShowCreateOrg] = useState(false);
    const [showVool, setShowCreateVool] = useState(false);
    const [showPart, setCreatePart] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowCreateOrg(false);
        setShowCreateVool(false);
        setCreatePart(false);
    };

    const handleCreateOrgClick = () => {
        setShowCreateOrg(true);
        setShowLogin(false);
        setShowCreateVool(false);
        setCreatePart(false);
    };

    const handleCreateVolClick = () => {
        setShowCreateVool(true);
        setShowLogin(false);
        setShowCreateOrg(false);
        setCreatePart(false);
    };

    const handleCreatePartClick = () => {
        setCreatePart(true);
        setShowLogin(false);
        setShowCreateOrg(false);
        setShowCreateVool(false);
    };

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

        fetchEvents(); // Apelează funcția pentru a încărca evenimentele la montarea componentei
    }, []);

    return (
        <div>
            <header className="col-12">
                <Logo />
                <nav>
                    <ul>
                        <li><a href="#" className="createAccount" id="organizator" onClick={handleCreateOrgClick}>
                            Are you an organizer?
                        </a></li>
                        <li><a href="#" className="createAccount" id="volunteer" onClick={handleCreateVolClick}>
                            Do you want to become a volunteer?
                        </a></li>
                        <li><a href="#" className="createAccount" id="participant" onClick={handleCreatePartClick}>
                            Do you want to participate?
                        </a></li>
                        <li><a href="#" className="button" id="login-button" onClick={handleLoginClick}>
                            Log In
                        </a></li>
                    </ul>
                </nav>
            </header>
            {showLogin ? (
                <LoginForm />
            ) : showOrg ? (
                <CreateOrganizator />
            ) : showVool ? (
                <CAVool />
            ) : showPart ? (
                <CreateParticipant />
            ) : (
                <main>
                    {showLogin ? (
                        <LoginForm />
                    ) : (
                        <div className="col-12 container-img-cards">
                            <Message />
                            <HomeImg />
                            <div className="cards-container1">
                                {events.map((event) => (
                                    <SmallCard key={event.id} event={event} />
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            )}
        </div>
    );
};

export default LogOut;
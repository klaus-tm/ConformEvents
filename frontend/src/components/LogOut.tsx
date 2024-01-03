import Logo from "./Logo.tsx";
import Login from "./Login.tsx";
import React, { useState } from "react";
import HomeImg from "./HomeImg.tsx";
import CreateOrganizator from "./CreateOrganizator.tsx";
import CAVool from "./CreateVolunteer.tsx";
import CreateParticipant from "./CreateParticipant.tsx";

const LogOut: React.FC = () => {
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

    const handleCreateVoolClick = () => {
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

    return (
        <div>
            <header className="col-12">
                <Logo />
                <nav>
                    <ul>
                        <li><a href="#" className="createAccount" id="organizator" onClick={handleCreateOrgClick}>
                            Are you an organizer?
                        </a></li>
                        <li><a href="#" className="createAccount" id="volunteer" onClick={handleCreateVoolClick}>
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
                <Login />
            ) : showOrg ? (
                <CreateOrganizator />
            ) : showVool ? (
                <CAVool />
            ) : showPart ? (
                <CreateParticipant />
            ) : (
                <HomeImg />
            )}
        </div>
    );
};

export default LogOut;
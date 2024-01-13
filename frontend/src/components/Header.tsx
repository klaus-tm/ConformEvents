import Logo from "./Logo.tsx";
import UserDropDown from "./UserDropDown.tsx";
import React, {useState} from "react";
import LoginForm from "./LoginForm.tsx";
import CreateOrganizator from "./CreateOrganizator.tsx";
import CreateVolunteer from "./CreateVolunteer.tsx";
import CreateParticipant from "./CreateParticipant.tsx";

function Header(){
    let org = null;
    // get the user date
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.type === 'Organiser') {
            org = (
                <a href="/create-event" className="createAccount" id="organizator">
                    Create a new event
                </a>
            );
        }
    }

    const  isUserLog = storedUserData !== null;
    return isUserLog ?
        (<header className="col-12">
            <Logo />
            <nav>
                <ul>
                    <li>{org}</li>
                    <li>
                        <UserDropDown />
                    </li>
                </ul>
            </nav>
        </header>
        ) : (
        <header className="col-12">
            <Logo />
            <nav>
                <ul>
                    <li>
                        <a href="/create/organizer" className="createAccount" id="organizator">
                            Are you an organizer?
                        </a>
                    </li>
                    <li>
                        <a href="/create/volunteers" className="createAccount" id="volunteer">
                            Do you want to become a volunteer?
                        </a>
                    </li>
                    <li>
                        <a href="/create/user" className="createAccount" id="participant">
                            Do you want to participate?
                        </a>
                    </li>
                    <li>
                        <a href="/login" className="button" id="login-button">
                            Log In
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
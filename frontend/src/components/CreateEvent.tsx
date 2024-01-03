import Logo from "./Logo.tsx";
import UserDropDown from "./UserDropDown.tsx";
import FormCreateEvent from "./FormCreateEvent.tsx";
function CreateEvent() {

    return <div>
        <header className="col-12">
            <Logo />
            <nav>
                <ul>
                    <li>
                        <a href="create-event" className="createAccount" id="organizator" /*onClick={handleCreateOrgClick}*/>
                            Create a new event
                        </a>
                    </li>
                    <li>
                        <UserDropDown />
                    </li>
                </ul>
            </nav>
        </header>
        <FormCreateEvent />
    </div>;
}

export default CreateEvent;
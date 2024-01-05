import Logo from "./Logo.tsx";
import UserDropDown from "./UserDropDown.tsx";

function CardExtended() {
    const storedUserData = localStorage.getItem('userData');
    let org = null;
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if(userData.type === 'Organiser')
            org = <a href="create-event" className="createAccount" id="organizator" /*onClick={handleCreateOrgClick}*/>
                Create a new event
            </a>;
    }
    return (<div>
        <header className="col-12">
            <Logo />
            <nav>
                <ul>
                    <li>
                        {org}
                    </li>
                    <li>
                        <UserDropDown />
                    </li>
                </ul>
            </nav>
        </header>
        <div className="home-cards-container">
            <div className="big-card">
                <p className="sm-card-name">Titlul primului sm-card</p>
                <p className="sm-card-location">Location: Locatia evenimentului</p>
                <p className="sm-card-deadline">Registration deadline: 01-01-2023</p>
            </div>
        </div>
    </div>
    );
}

export default CardExtended;

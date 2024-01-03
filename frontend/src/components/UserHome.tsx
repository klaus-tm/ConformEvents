import Logo from "./Logo.tsx";
import HomeImg from "./HomeImg.tsx";
import UserDropDown from "./UserDropDown.tsx";

function UserHome() {
    let org = null;

    // get the date
    const storedUserData = localStorage.getItem('userData');
    console.log(storedUserData);

    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if(userData.type === 'Organiser')
            org = <a href="create-event" className="createAccount" id="organizator" /*onClick={handleCreateOrgClick}*/>
                Create a new event
            </a>;
    }
    return <div>
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
        <HomeImg />
    </div>;
}

export default UserHome;
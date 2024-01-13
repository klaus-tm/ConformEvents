// ONLY for the page where the user is log
import Logo from "./Logo.tsx";
import UserDropDown from "./UserDropDown.tsx";

function Header(){
    let org = null;
    // get the user date
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.type === 'Organiser') {
            org = (
                <a href="create-event" className="createAccount" id="organizator">
                    Create a new event
                </a>
            );
        }
    }
    return <header className="col-12">
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
}

export default Header;
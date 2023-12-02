import Logo from "./Logo.tsx";
import DropDownMenu from "./DropDownMenu.tsx";
import HomeImg from "./HomeImg.tsx";
import UserDropDown from "./UserDropDown.tsx";

function UserHome() {
    return <div>
        <header className="col-12">
            <Logo />
                <nav>
                    <ul>
                        <li>
                            <DropDownMenu />
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
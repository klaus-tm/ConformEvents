import Logo from "./Logo.tsx";
import LoginForm from "./LoginForm.tsx";
import { useState } from "react";
import HomeImg from "./HomeImg.tsx";
import DropDownMenu from "./DropDownMenu.tsx";

const Home: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    return (
        <div>
            <header className="col-12">
                <Logo />
                {showLogin ? null : (
                    <nav>
                        <ul>
                            <li>
                                <DropDownMenu />
                            </li>
                            <li>
                                <a href="#" className="button" id="login-button" onClick={handleLoginClick}>
                                    Log In
                                </a>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>
            <main>
                {showLogin ? <LoginForm /> : <HomeImg />}
            </main>
        </div>
    );
};

export default Home;

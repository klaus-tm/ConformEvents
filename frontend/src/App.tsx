import './App.css';
import './style/header.css';
import './style/index.css';
import './style/login.css';

import {useState} from "react";

import Logo from "./components/Logo.tsx";
import DropDownMenu from "./components/DropDownMenu.tsx";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx";

function App(){
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    }

    return<div>
        <div>
            <header className="col-12">
                <Logo />
                {showLogin ? null :
                    <nav>
                        <ul>
                            <li>
                                <DropDownMenu/>
                            </li>
                            <li>
                                <a href="#" className="button" id="login-button" onClick={handleLoginClick}>
                                Log In</a>
                                </li>
                        </ul>
                    </nav>}
            </header>
            {showLogin ? <Login /> : <Home />}
        </div>
    </div>
}

export default App;
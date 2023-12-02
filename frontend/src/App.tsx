import './App.css';
import './style/header.css';
import './style/index.css';
import './style/login.css';

// import {useState} from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home.tsx";
import UserHome from "./components/UserHome.tsx";

function App(){
    return<Router>
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<UserHome />} />
            </Routes>
        </div>
    </Router>
}

export default App;
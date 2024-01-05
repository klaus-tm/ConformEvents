import 'bootstrap/dist/css/bootstrap.min.css'
import './style/responsive.css';
import './App.css';
import './style/dropdown.css';
import './style/form.css';
import './style/header.css';
import './style/index.css';
import './style/card.css';

// import {useState} from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserHome from "./components/UserHome.tsx";
import LogOut from "./components/LogOut.tsx";
// import React from "react";
import CreateEvent from "./components/CreateEvent.tsx";
function App(){
    return<Router>
        <div>
            <Routes>
                <Route path="/" element={<LogOut />} />
                <Route path="/home" element={<UserHome />} />
                <Route path="/create-event" element={<CreateEvent />} />
            </Routes>
        </div>
    </Router>
}

export default App;
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/responsive.css';
import './App.css';
import './style/dropdown.css';
import './style/form.css';
import './style/header.css';
import './style/index.css';
import './style/card.css';

import {BrowserRouter as Router, Routes, Route, Path} from 'react-router-dom';
import UserHome from "./components/UserHome.tsx";
import LogOut from "./components/LogOut.tsx";
import CreateEvent from "./components/CreateEvent.tsx";
import ExtendedCard from "./components/ExtendedCard.tsx";
import YourEvents from "./components/YourEvents.tsx";

function App(){
    return<Router>
        <div>
            <Routes>
                <Route path="/" element={<LogOut />} />
                <Route path="/home" element={<UserHome />} />
                <Route path="/create-event" element={<CreateEvent />} />
                {/*<Route path="/event-details/:eventId" element={<ExtendedCard />} />*/}
                <Route path="/event-details/:id" element={<ExtendedCard />} />
                <Route path="/your-events" element={<YourEvents />} />
            </Routes>
        </div>
    </Router>
}

export default App;
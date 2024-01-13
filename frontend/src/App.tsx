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
import CreateEvent from "./components/CreateEvent.tsx";
import ExtendedCard from "./components/ExtendedCard.tsx";
import YourEvents from "./components/YourEvents.tsx";
import CreateOrganizator from "./components/CreateOrganizator.tsx";
import LoginForm from "./components/LoginForm.tsx";
import CreateVolunteer from "./components/CreateVolunteer.tsx";
import CreateParticipant from "./components/CreateParticipant.tsx";

function App(){
    return<Router>
        <div>
            <Routes>
                <Route path="/create/organizer" element={<CreateOrganizator />} />
                <Route path="/create/volunteers" element={<CreateVolunteer />} />
                <Route path="/create/user" element={<CreateParticipant />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<UserHome />} />
                <Route path="/home" element={<UserHome />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/event-details/:id" element={<ExtendedCard />} />
                <Route path="/your-events" element={<YourEvents />} />
            </Routes>
        </div>
    </Router>
}

export default App;
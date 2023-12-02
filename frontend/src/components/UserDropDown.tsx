import { useNavigate } from 'react-router-dom';

function UserDropDown() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('userData');
        // Navigate to the Home page
        navigate('/');
    };

    // get the date
    const storedUserData = localStorage.getItem('userData');
    console.log(storedUserData);

    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        let userTypeMenu = null;
        switch (userData.type) {
            case 'Participant':
                userTypeMenu = (
                    <button className="btn-drop-down">Events You Have Participated In</button>
                );
                break;
            case 'Organiser':
                userTypeMenu = (
                    <>
                        <button className="btn-drop-down">The Events You Organized</button>
                        <button className="btn-drop-down">Create event</button>
                    </>
                );
                break;
            case 'Volunteers':
                userTypeMenu = (
                    <button className="btn-drop-down">The Events You Volunteered At</button>
                );
                break;
        }

        return (
            <div className="dropdown">
                <button className="dropbtn" id="userdrop">{userData.firstName}</button>
                <div className="dropdown-content">
                    {/*<button className="btn-drop-down">Edit Profile</button>*/}
                    {userTypeMenu}
                    <button className="btn-drop-down" onClick={handleLogout}>Log out</button>
                </div>
            </div>
        );
    } else {
        alert('There is an error. Please try again.');
        return <NotFound />;
    }
}

export default UserDropDown;
function Logo() {
    // const navigate = useNavigate();

    // get the date
    const storedUserData = localStorage.getItem('userData');

    // Define the destination URL based on the presence of user data
    const destinationURL = storedUserData ? '/home' : '/';

    // const handleLogout = () => {
    //     // Remove user data from localStorage
    //     localStorage.removeItem('userData');
    //     // Navigate to the Home page
    //     navigate('/');
    // };

    return (
        <div className="logo">
            <a href={destinationURL} id="home-link">
                <img src="/src/img/logo.gif" alt="Our logo" />
                <span>ConForm Events</span>
            </a>
        </div>
    );
}

export default Logo;

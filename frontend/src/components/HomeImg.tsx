function HomeImg() {
    let userTypeMenu = <p className="intro">You are not logged in.</p>;

    // get the date
    const storedUserData = localStorage.getItem('userData');
    console.log(storedUserData);

    if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        switch (userData.type) {
            case 'Participant':
                userTypeMenu = <p className="intro">Participate in our events</p>;
                break;
            case 'Organiser':
                userTypeMenu = <p className="intro">Create new events!</p>;
                break;
            case 'Volunteers':
                userTypeMenu = <p className="intro">Lend a helping hand</p>;
                break;
        }
    }

    return (
        <main className="col-12">
            {userTypeMenu}
            <br />
            <div className="container">
                <img className="container-img img1" src="./src/img/2.jpg" alt="" />
                <img className="container-img img2" src="./src/img/1.jpg" alt="" />
                <img className="container-img img1" src="./src/img/3.jpg" alt="" />
            </div>
        </main>
    );
}

export default HomeImg;



function DropDownMenu(){
    return (<div className="dropdown">
        <button className="dropbtn">Events</button>
        <div className="dropdown-content">
            <a href="#">Meetings</a>
            <a href="#">Concerts</a>
            <a href="#">Plays</a>
            <a href="#">Career Fairs</a>
        </div>
    </div>);
}
export default DropDownMenu;
function DropDownMenu(){
    return (<div className="dropdown">
        <button className="dropbtn">Events</button>
        <div className="dropdown-content">
            <button className="btn-drop-down">Meetings</button>
            <button className="btn-drop-down">Concerts</button>
            <button className="btn-drop-down">Plays</button>
            <button className="btn-drop-down">Career Fairs</button>
        </div>
    </div>);
}
export default DropDownMenu;
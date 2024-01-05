// import React from 'react';

interface CardsContainerProps {
    jsonData: any;
}
function CardsContainer(props: CardsContainerProps) {
    console.log(props.jsonData);

    return (
        <div className="home-cards-container">
            <div className="sm-card">
                <p className="sm-card-name">Titlul primului sm-card</p>
                <p className="sm-card-location">Location: Locatia evenimentului</p>
                <p className="sm-card-deadline">Registration deadline: 01-01-2023</p>
                <button className="sm-card-button">More info</button>
            </div>
        </div>
    );
}

export default CardsContainer;

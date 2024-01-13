import React, { useState } from 'react';

const VolunteersList = () => {
    // TODO
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion">
            <div className="accordion-header" onClick={toggleAccordion}>
                <h6>Volunteers List</h6>
            </div>
            {isOpen && (
                <div className="accordion-content">
                    <p>Yes</p>
                </div>
            )}
        </div>
    );
};

export default VolunteersList;

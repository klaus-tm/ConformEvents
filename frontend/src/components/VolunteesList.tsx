import React, { useState } from 'react';

const VolunteersList = () => {
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
                    <p>Conținutul Acordeonului va fi aici.</p>
                </div>
            )}
        </div>
    );
};

export default VolunteersList;

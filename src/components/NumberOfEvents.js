// src/components/NumberOfEvents.js

//import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    // const [eventNumber, setEventNumber] = useState();
    const handleInputChaged = (event) => {
        const value = event.target.value;
        setCurrentNOE(value);

        let infoText;
        if (isNaN(value) || value <= 0) {
            infoText = "Only positive numbers are allowed"
        } else {
            infoText = "";
            setCurrentNOE(value);
        }
        setErrorAlert(infoText)

        /*if (isNaN(value)) {
            setErrorAlert('value is not a number');
        } else if (value > 50) {
            setErrorAlert('maximum value is 50');
        } else if (value <= 0) {
            setErrorAlert('minimum value is 1');
        } else {
            setErrorAlert('');
            setCurrentNOE(value);
        }*/
    };


    return (
        <div id="number-of-events">
            <input
                type="text"
                defaultValue={'32'}
                className="number-of-events-input"
                //value={eventNumber}

                onChange={handleInputChaged}
            />

        </div>
    )
}

export default NumberOfEvents;
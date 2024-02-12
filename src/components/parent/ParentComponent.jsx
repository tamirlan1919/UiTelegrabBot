// ParentComponent.jsx
import React, { useState } from 'react';
import Voices from '../voices/Voices';
import Tuning from '../tuning/Tuning';

const ParentComponent = ({ user_id, tg }) => {
    const [speed, setSpeed] = useState(1.0);
    const [format, setFormat] = useState('mp3');

    const handleSaveSettings = (newSpeed, newFormat) => {
        setSpeed(newSpeed);
        setFormat(newFormat);
    };

    return (
        <div>
            <Voices user_id={user_id} tg={tg} speed={speed} format={format} />
            <Tuning onSaveSettings={handleSaveSettings} />
        </div>
    );
};

export default ParentComponent;

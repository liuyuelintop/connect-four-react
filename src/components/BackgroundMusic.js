import React from 'react';
import backgroundMusic from '../sounds/DayOne_Interstellar.mp3';

function BackgroundMusic() {
    return (
        <audio autoPlay loop>
            <source src={backgroundMusic} type="audio/mpeg" />
        </audio>
    );
}

export default BackgroundMusic;

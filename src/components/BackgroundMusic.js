import React from 'react';
import backgroundMusic from '../sounds/DayOne_Interstellar.mp3';

function BackgroundMusic({isStarted}) {
    
    return (
        <div>
            {
                isStarted ? 
                (<audio autoPlay loop>
                    <source src={backgroundMusic} type="audio/mpeg" />
                </audio>) :
                (null)
            }
        </div>
    );
}

export default BackgroundMusic;

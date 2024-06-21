import React, { useEffect, useState } from 'react';

const lines = [
    "Секогаш тука за ",
    "вашето милениче."
];

const CoverText = () => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentLineIndex === lines.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setCurrentLineIndex(0);
                    setCurrentCharIndex(0);
                    setDisplayText('');
                }, 3000); // Pause for 5 seconds
            } else if (currentCharIndex === lines[currentLineIndex].length) {
                setDisplayText(prev => prev + '\n'); // Add a newline character
                setCurrentLineIndex(currentLineIndex + 1);
                setCurrentCharIndex(0);
            } else {
                setDisplayText(prev => prev + lines[currentLineIndex][currentCharIndex]);
                setCurrentCharIndex(currentCharIndex + 1);
            }
        }, 30); // Adjust typing speed here (in milliseconds)

        return () => clearInterval(interval);
    }, [currentLineIndex, currentCharIndex]);

    return (
        <h1 className="typing-animation">{displayText}</h1>
    );
};

export default CoverText;

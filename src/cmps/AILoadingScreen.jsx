import React, { useEffect, useState } from 'react';
import openAiIcon from '../assets/imgs/Icons/openAI_Logo.svg'

export function AILoadingScreen({ isLoading }) {

    const [dots, setDots] = useState(1);

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setDots((prevDots) => (prevDots % 3) + 1);
            }, 500);

            return () => clearInterval(interval);
        }
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div className="ai-loading-overlay">
            <div className="ai-loading-content">
                <img className='ai-icon-spinner' src={openAiIcon} alt="" />
                <h2>AI is thinking{'.'.repeat(dots)}</h2>
            </div>
        </div>
    )
}
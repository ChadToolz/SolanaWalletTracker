import React, { useCallback, useEffect, useState } from 'react';
import { addLogListener } from '../services/solana.js';

export const CurrentSlot = () => {
    const [currentSlot, setCurrentSlot] = useState(null);
    
    const slotListener = useCallback(([log, { slot }]) => {
        if (currentSlot === slot) {
            return;
        };
        
        setCurrentSlot(slot);
    }, [currentSlot]);

    useEffect(() => {
        return addLogListener(slotListener);
    }, [slotListener]);
    
    return (
        <div>
        <h2>Current Block: {currentSlot}</h2>
        </div>
    );
};

export default CurrentSlot;
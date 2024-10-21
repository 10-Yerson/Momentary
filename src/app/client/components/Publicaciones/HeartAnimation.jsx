// HeartAnimation.jsx
import React from 'react';

const HeartAnimation = ({ x, y }) => {
    return (
        <div className="absolute w-6 h-6" style={{ left: `${x}px`, top: `${y}px` }}>
            <div className="bg-red-500 rounded-full opacity-100"></div>
        </div>
    );
};

export default HeartAnimation;

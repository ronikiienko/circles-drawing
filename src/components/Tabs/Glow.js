import React from 'react';


export const Glow = ({settings, handleChange}) => {
    return (
        <>
            <label>
                Glow:
                <input
                    value={settings.glow.glow}
                    className="glow"
                    id="glow-glow"
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step="0.1"
                    type="range"
                />
            </label>
        </>
    );
};
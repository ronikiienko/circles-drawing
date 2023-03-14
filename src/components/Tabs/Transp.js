import React from 'react';


export const Transp = ({settings, handleChange}) => {
    return (
        <>
            <label>
                Transp:
                <input
                    value={settings.transp.transp}
                    className="transp"
                    id="transp-transp"
                    onChange={handleChange}
                    min="0"
                    max="1"
                    step="0.05"
                    type="range"
                />
            </label>
            <label>
                Transp rand:
                <input
                    value={settings.transp.transpRand}
                    className="transp-rand"
                    id="transp-transpRand"
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
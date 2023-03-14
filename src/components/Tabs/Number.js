import React from 'react';


export const Number = ({settings, handleChange}) => {
    return (
        <label className="number-inputs">
            Number:
            <input
                value={settings.number.number}
                className="number"
                id="number-number"
                onChange={handleChange}
                type="text" inputMode="numeric"
            />
        </label>
    );
};
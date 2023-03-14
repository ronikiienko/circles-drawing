import React from 'react';
import {ConditionalPanel} from '../utils/ConditionalPanel';


export const Color = ({settings, handleChange}) => {
    return (
        <>
            <label>
                Color:
                <input
                    value={settings.color.color}
                    className="color"
                    id="color-color"
                    onChange={handleChange}
                    type="color"
                />
            </label>
            <ConditionalPanel active={!settings.color.isFullRand}>
                Color rand:
                <input
                    value={settings.color.colorRand}
                    className="color-rand" id="color-colorRand"
                    onChange={handleChange}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                />
            </ConditionalPanel>
            <label>
                Color rand on:
                <input
                    checked={settings.color.isFullRand}
                    className="color-rand-on"
                    id="color-isFullRand"
                    onChange={handleChange}
                    type="checkbox"
                />
            </label>
        </>
    );
};

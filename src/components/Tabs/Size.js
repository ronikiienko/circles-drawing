import {Input, Label, Slider} from '@fluentui/react-components';
import React from 'react';


export const Size = ({settings, handleChange}) => {
    return (
        <>
            <Label>
                Size:
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    id="size-size"
                    value={settings.size.size}
                    onChange={handleChange}
                />
                <Input
                    type="number"
                    value={settings.size.size}
                    onChange={handleChange}
                    id="size-size"
                    size="small"
                />
            </Label>
            <br/>
            <label>
                Size rand:
                <input
                    value={settings.size.sizeRand}
                    className="size-rand"
                    id="size-sizeRand"
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
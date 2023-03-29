import {Button} from '@fluentui/react-components';
import React from 'react';
import {getRandomPreset} from '../../utils/presetUtils';


export const Generation = ({settings, setSettings, classes}) => {
    return (
        <div>
            <Button onClick={() => setSettings(getRandomPreset())}>Randomize settings</Button>
        </div>
    );
};
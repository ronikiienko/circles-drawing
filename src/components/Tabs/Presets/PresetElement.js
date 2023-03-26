import {Button, makeStyles, mergeClasses, shorthands, tokens} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import {Delete16Regular} from '@fluentui/react-icons';
import React from 'react';
import {getPreset} from '../../../consts/consts';
import {deepCopy} from '../../../utils';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';


const useStyles = makeStyles({

    presetElementContainer: {
        height: '23px',
        ...shorthands.padding('5px'),
        marginBlock: '5px',
        ...shorthands.border('1px', 'solid'),
        ...shorthands.borderColor(tokens.colorNeutralStroke1),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    presetElementButton: {
        marginInline: '2px',
    },
    selected: {
        backgroundColor: tokens.colorNeutralForeground2BrandSelected,
    },
});

export const PresetElement = ({preset, settings, setSettings, removeButton, index, removeUserPreset}) => {
    const localClasses = useStyles();
    return (
        <>
            <span
                className={settings.preset.id === preset.preset.id ? mergeClasses(localClasses.presetElementContainer, localClasses.selected) : localClasses.presetElementContainer}
                key={preset.preset.id}
                title={preset.preset.description}
            >
                <span>{preset.preset.name}</span>
                <InfoButton
                    content={
                        <>{preset.preset.description}</>
                    }
                />
                    <span className={localClasses.presetElementButtons}>
                        <ConditionalPanel active={removeButton}>
                            <Button
                                className={localClasses.presetElementButton}
                                size="small"
                                icon={<Delete16Regular/>}
                                onClick={() => removeUserPreset(index)}
                            >
                            </Button>
                        </ConditionalPanel>
                        <Button
                            className={localClasses.presetElementButton}
                            size="small"
                            onClick={() => setSettings(getPreset(deepCopy(preset)))}
                        >
                            Use
                        </Button>
                    </span>
            </span>
        </>
    );
};
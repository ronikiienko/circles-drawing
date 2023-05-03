import {makeStyles, mergeClasses, shorthands, tokens} from '@fluentui/react-components';
import {Delete48Regular} from '@fluentui/react-icons';
import React from 'react';
import {getLayerSettings} from '../../../utils/layerSettings/getter';
import {ConditionalPanel} from '../../Shared/ConditionalPanel';
import {DialogButton} from '../../Shared/DialogButton';


const useStyles = makeStyles({

    presetElementContainer: {
        ...shorthands.padding('6px'),
        ...shorthands.marginBlock('5px'),
        ...shorthands.border('1px', 'solid'),
        ...shorthands.borderColor(tokens.colorNeutralStroke1),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...shorthands.transition('background-color', '200ms'),
    },
    presetElementButton: {
        ...shorthands.marginInline('2px'),
    },
    selected: {
        backgroundColor: tokens.colorNeutralShadowKeyDarker,
    },
    presetDescription: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground2BrandSelected,
    },
    presetElementButtons: {
        minWidth: 'fit-content',
        marginLeft: '10px',
    },
});

export const PresetElement = ({preset, settings, setSettings, removeButton, index, removeUserPreset}) => {
    const localClasses = useStyles();
    return (
        <>
            <span
                onClick={() => {
                    setSettings(getLayerSettings(preset));
                }}
                className={settings.preset.id === preset.preset.id ? mergeClasses(localClasses.presetElementContainer, localClasses.selected) : localClasses.presetElementContainer}
                key={preset.preset.id}
                title={preset.preset.description}
            >
                <div>
                    <span>{preset.preset.name}</span>
                    <br/>
                    <span className={localClasses.presetDescription}>{preset.preset.description}</span>
                </div>
                    <span className={localClasses.presetElementButtons}>
                        <ConditionalPanel active={removeButton}>
                            <DialogButton
                                header="Remove preset"
                                description="Are you sure you want to remove preset?"
                                onSubmit={(event) => removeUserPreset(event, index)}
                                className={localClasses.presetElementButton}
                                icon={<Delete48Regular/>}
                                appearance="transparent"
                            ></DialogButton>
                        </ConditionalPanel>
                    </span>
            </span>
        </>
    );
};
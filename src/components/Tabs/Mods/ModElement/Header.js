import {Input, makeStyles, shorthands, tokens} from '@fluentui/react-components';
import {Delete16Regular} from '@fluentui/react-icons';
import React from 'react';
import {hslArrToHsl} from '../../../../utils/generalUtils';
import {DialogButton} from '../../../Utils/DialogButton';


const useStyles = makeStyles({
    nameInputs: {
        // height: '20px',
        marginRight: '5px',
    },
    accordionHeader: {
        paddingInline: '5px',
        paddingBlock: '3px',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    removeButton: {
        display: 'flex',
        alignItems: 'center',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
            color: tokens.colorNeutralForeground2BrandHover,
        },
        ':active': {
            backgroundColor: tokens.colorNeutralBackground1Pressed,
            color: tokens.colorNeutralForeground2BrandPressed,
        },
        ...shorthands.padding('5px'),
        float: 'right',
        marginLeft: '20px',
    },
});
export const Header = ({settings, modIndex, handleChange, removeMod}) => {
    const localClasses = useStyles();
    return (
        <div
            className={localClasses.accordionHeader}
            style={{backgroundColor: hslArrToHsl(settings.mods[modIndex].color, 0.3)}}
        >
            <div>
                <Input
                    appearance="underline"
                    id={`mods-${modIndex}-name`}
                    value={settings.mods[modIndex].name}
                    onChange={handleChange}
                    className={localClasses.nameInputs}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                    size="small"
                />
                {settings.mods[modIndex].type}
            </div>
            <DialogButton
                onSubmit={(event) => {
                    removeMod(event, modIndex);
                }}
                className={localClasses.removeButton}
                icon={<Delete16Regular/>}
                header="Are you sure you want to remove modulator?"
                appearance="subtle"
            >
            </DialogButton>
        </div>
    );
};
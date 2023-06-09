import {Input, makeStyles, shorthands, Text, tokens, Tooltip} from '@fluentui/react-components';
import {ChevronRight20Regular, Delete16Regular} from '@fluentui/react-icons';
import React, {useMemo} from 'react';
import {hslArrToHsl} from '../../../../utils/generalUtils';
import {useAccordionState} from '../../../Shared/Accordion';
import {DialogButton} from '../../../Shared/DialogButton';


const useStyles = makeStyles({
    nameInputs: {
        // height: '20px',
        marginRight: '5px',
    },
    openedIcon: {
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
    headerLeftPart: {
        display: 'flex',
        alignItems: 'center',
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
    outputsTooltip: {
        marginLeft: '10px',
        ...shorthands.padding('3px'),
        backgroundColor: tokens.colorSubtleBackgroundInvertedPressed,
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
});
export const Header = ({modIndex, handleChange, removeMod, mod}) => {
    const [isOpened, setIsOpened] = useAccordionState();
    const activeOutputs = useMemo(() => {
        return Object.entries(mod.outputs).reduce((accum, [key, value]) => {
            if (value.enabled) {
                accum.push(key);
            }
            return accum;
        }, []);
    }, [mod.outputs]);
    const localClasses = useStyles();
    return (
        <div
            className={localClasses.accordionHeader}
            style={{backgroundColor: hslArrToHsl(mod.color, 0.3)}}
        >
            <div className={localClasses.headerLeftPart}>
                <ChevronRight20Regular
                    style={{
                        transform: `${isOpened ? 'rotate(90deg)' : ''}`,
                        transition: 'transform 100ms',
                    }}
                    className={localClasses.openedIcon}
                />
                <Input
                    appearance="underline"
                    id={`mods-${modIndex}-name`}
                    value={mod.name}
                    onChange={handleChange}
                    className={localClasses.nameInputs}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                    size="small"
                />
                {mod.settings.type}
                <Tooltip content={activeOutputs.join(' ')} relationship="label">
                    <Text className={localClasses.outputsTooltip} size="small">{activeOutputs.length}</Text>
                </Tooltip>
                <Text className={localClasses.outputsTooltip} size="small">{mod.modOutputs.length}</Text>
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
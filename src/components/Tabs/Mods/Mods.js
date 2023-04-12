import {Accordion, Button, makeStyles} from '@fluentui/react-components';
import React from 'react';
import {getDefaultMod} from '../../../consts/consts';
import {getEventObj} from '../../../utils/generalUtils';
import {getRandomAdjective} from '../../../utils/nameGenerator';
import {ModElement} from './ModElement';


const useStyles = makeStyles({
    addButton: {
        width: '100%',
    },
});

export const Mods = ({settings, setSettings, handleChange, classes, setClickAndSetProp, setDragProp}) => {
    const localClasses = useStyles();

    const removeMod = (event, index) => {
        event.stopPropagation();
        setSettings(draft => {
            draft.mods.splice(index, 1);
        });
    };

    return (
        <>
            <Accordion
                size="small"
                multiple
                collapsible
            >
                {settings.mods.map((mod, index) => {
                    return <ModElement
                        setDragProp={setDragProp}
                        setClickAndSetProp={setClickAndSetProp}
                        key={settings.mods[index].id}
                        handleChange={handleChange}
                        settings={settings}
                        removeMod={removeMod}
                        classes={classes}
                        index={index}
                    />;
                })}
            </Accordion>
            <Button
                className={localClasses.addButton}
                onClick={() => handleChange(getEventObj(getDefaultMod(getRandomAdjective()), `mods-${settings.mods.length}`))}
            >
                Add modulator
            </Button>
        </>
    );
};
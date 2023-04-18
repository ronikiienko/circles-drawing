import {Accordion, Button, makeStyles} from '@fluentui/react-components';
import React from 'react';
import {getDefaultMod} from '../../../consts/consts';
import {getEventObj} from '../../../utils/generalUtils';
import {getRandomAdjective} from '../../../utils/nameGenerators';
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
        if (!confirm('Are you sure you want to remove modulator?')) return;
        setSettings(draft => {
            const deletedId = settings.mods[index].id;
            draft.mods.splice(index, 1);
            draft.mods.forEach(mod => {
                for (let i = mod.modOutputs.length - 1; i >= 0; i--) {
                    if (mod.modOutputs[i].id === deletedId) mod.modOutputs.splice(i, 1);
                }
            });
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
                        setSettings={setSettings}
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
import {Button, makeStyles} from '@fluentui/react-components';
import React, {useCallback} from 'react';
import {getDefaultMod} from '../../../consts/consts';
import {usePersistedImmer} from '../../../hooks/usePersistedImmer';
import {getEventObj} from '../../../utils/generalUtils';
import {getRandomAdjective} from '../../../utils/nameGenerators';
import {Accordion} from '../../Utils/Accordion';
import {ModElement} from './ModElement';


const useStyles = makeStyles({
    addButton: {
        width: '100%',
    },
});

export const Mods = ({settings, setSettings, handleChange, classes, setClickAndSetProp, setDragProp}) => {
    const localClasses = useStyles();

    const removeMod = useCallback((event, index) => {
        setSettings(draft => {
            const deletedId = settings.mods[index].id;
            draft.mods.splice(index, 1);
            draft.mods.forEach(mod => {
                for (let i = mod.modOutputs.length - 1; i >= 0; i--) {
                    if (mod.modOutputs[i].id === deletedId) mod.modOutputs.splice(i, 1);
                }
            });
        });
    }, [setSettings, settings.mods]);
    const [accordionState, setAccordionState] = usePersistedImmer({}, 'accordionState');
    return (
        <>
            <Accordion
                state={accordionState}
                statePath={''}
                setState={setAccordionState}

            >
                {settings.mods.map((mod, modIndex) => {
                    return <ModElement
                        setDragProp={setDragProp}
                        setClickAndSetProp={setClickAndSetProp}
                        key={settings.mods[modIndex].id}
                        handleChange={handleChange}
                        settings={settings}
                        removeMod={removeMod}
                        classes={classes}
                        modIndex={modIndex}
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
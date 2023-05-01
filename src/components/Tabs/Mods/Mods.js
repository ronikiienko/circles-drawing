import {Button, makeStyles} from '@fluentui/react-components';
import React, {memo, useCallback} from 'react';
import {getDefaultMod} from '../../../consts/consts';
import {usePersistedImmer} from '../../../hooks/usePersistedImmer';
import {getEventObj} from '../../../utils/generalUtils';
import {getRandomAdjective} from '../../../utils/nameGenerators';
import {Accordion} from '../../Utils/Accordion';
import {ModElement} from './ModElement/ModElement';


const useStyles = makeStyles({
    addButton: {
        width: '100%',
    },
});

const areEqual = (prevProps, nextProps) => {
    let areEqual = prevProps.settings.mods === nextProps.settings.mods;
    for (const key of Object.keys(prevProps)) {
        if (key !== 'settings' && prevProps[key] !== nextProps[key]) {
            console.log('changed:', key);
            areEqual = false;
            break;
        }
    }

    return areEqual;
};

export const Mods = memo(({settings, setSettings, handleChange, classes, setClickAndSetProp, setDragProp}) => {
    console.log('hi');
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
                setState={setAccordionState}
                statePath="modsblabla-top-dot"
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
}, areEqual);
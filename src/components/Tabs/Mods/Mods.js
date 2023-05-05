import {Button, makeStyles} from '@fluentui/react-components';
import React from 'react';
import {getDefaultMod} from '../../../consts/consts';
import {getEventObj} from '../../../utils/generalUtils';
import {getRandomAdjective} from '../../../utils/nameGenerators';
import {Accordion} from '../../Shared/Accordion';
import {ModElement} from './ModElement/ModElement';


const useStyles = makeStyles({
    addButton: {
        width: '100%',
    },
});

export const Mods = ({
                         settings,
                         setSettings,
                         handleChange,
                         classes,
                         setClickAndSetProp,
                         setDragProp,
                         navState,
                         setNavState,
                     }) => {
    const localClasses = useStyles();
    return (
        <>
            <Accordion
                state={navState}
                setState={setNavState}
                statePath="modsAccordion"
            >
                {settings.mods.map((mod, modIndex) => {
                    return <ModElement
                        id={settings.mods[modIndex].id}
                        setDragProp={setDragProp}
                        setClickAndSetProp={setClickAndSetProp}
                        key={settings.mods[modIndex].id}
                        handleChange={handleChange}
                        settings={settings}
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
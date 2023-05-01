import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import React from 'react';
import {AccordionItem} from '../../../Utils/Accordion';
import {Header} from './Header';
import {Panel} from './Panel';


const useStyles = makeStyles({
    block: {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStencil1Alpha),
        marginBlock: '5px',
    },
});
// TODO while typing mod name many things happen...

// TODO rerenders when moving coord flag
export const ModElement = ({
                               modIndex,
                               handleChange,
                               settings,
                               removeMod,
                               classes,
                               setDragProp,
                               setClickAndSetProp,
                               setSettings,
                           }) => {
    const localClasses = useStyles();
    return (
        <>
            <AccordionItem
                className={localClasses.block}
                value={settings.mods[modIndex].id}
                id={settings.mods[modIndex].id}
                header={
                    <Header
                        modIndex={modIndex}
                        settings={settings}
                        handleChange={handleChange}
                        removeMod={removeMod}
                    />
                }
                panel={
                    <Panel
                        handleChange={handleChange}
                        settings={settings}
                        modIndex={modIndex}
                        classes={classes}
                        setSettings={setSettings}
                        setClickAndSetProp={setClickAndSetProp}
                        setDragProp={setDragProp}
                    />
                }
            >
            </AccordionItem>
        </>
    );
};
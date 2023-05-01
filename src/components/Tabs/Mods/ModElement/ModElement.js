import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import React, {memo} from 'react';
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

const areEqual = (prevProps, nextProps) => {
    let areEqual = prevProps.settings.mods[prevProps.modIndex] === nextProps.settings.mods[nextProps.modIndex];
    for (const key of Object.keys(prevProps)) {
        if (key !== 'settings' && prevProps[key] !== nextProps[key]) {
            areEqual = false;
            break;
        }
    }
    return areEqual;
};
export const ModElement = memo(({
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
}, areEqual);
import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import React, {useCallback} from 'react';
import {AccordionItem} from '../../../Shared/Accordion';
import {Header} from './Header';
import {Panel} from './Panel';


const useStyles = makeStyles({
    block: {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStencil1Alpha),
        ...shorthands.marginBlock('5px'),
    },
});
// TODO while typing mod name many things happen...

// i would be glad to wrap it in memo, but modOutputs are in another mod, so we should update also when mod which modulates this mod changes..
export const ModElement = ({
                               modIndex,
                               handleChange,
                               settings,
                               classes,
                               setDragProp,
                               setClickAndSetProp,
                               setSettings,
                           }) => {
    const localClasses = useStyles();

    const removeMod = useCallback(() => {
        setSettings(draft => {
            draft.mods.splice(modIndex, 1);
            draft.mods.forEach(mod => {
                for (let i = mod.modOutputs.length - 1; i >= 0; i--) {
                    if (mod.modOutputs[i].id === modIndex) mod.modOutputs.splice(i, 1);
                }
            });
        });
    }, [modIndex, setSettings]);

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
            >
                <Panel
                    handleChange={handleChange}
                    settings={settings}
                    modIndex={modIndex}
                    classes={classes}
                    setSettings={setSettings}
                    setClickAndSetProp={setClickAndSetProp}
                    setDragProp={setDragProp}
                />
            </AccordionItem>
        </>
    );
};
import {
    Checkbox,
    makeStyles,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    mergeClasses,
    shorthands,
    Text,
    tokens,
} from '@fluentui/react-components';
import React from 'react';
import {hslArrToHsl} from '../../utils/generalUtils';


const useStyles = makeStyles({
    sliderSize: {
        width: '250px',
    },
    modItem: {
        ...shorthands.padding('5px'),
        marginBlock: '5px',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    modItemBase: {
        backgroundColor: tokens.colorNeutralStencil1Alpha,
    },
});

export const ParamHeader = ({header, children}) => {
    const localClasses = useStyles();
    return (
        <>
            <Text size={600} block>{header}</Text>
            <div className={mergeClasses(localClasses.modItemBase, localClasses.modItem)}>
                {children}
            </div>
        </>
    );

};
export const ParamMod = ({handleChange, paramName, settings, modIndex, children}) => {
    const localClasses = useStyles();
    const mod = settings.mods[modIndex];
    if (!mod.outputs[paramName].enabled) return null;
    return (
        <>
            <div
                key={mod.id} className={localClasses.modItem}
                style={{backgroundColor: hslArrToHsl(mod.color, 0.3)}}
            >
                <span>
                    {mod.name} ({mod.type})
                    <Checkbox
                        id={`mods-${modIndex}-outputs-${paramName}-enabled`}
                        checked={mod.outputs[paramName].enabled}
                        onChange={handleChange}
                    />
                </span>
                <span>
                    {children}
                </span>
            </div>
        </>

    );
};

export const ParamAddModButton = ({settings, classes, setSettings, paramName}) => {
    return (
        <Menu>
            <MenuTrigger>
                <MenuButton
                    disabled={!settings.mods.some(element => !element.outputs[paramName].enabled)}
                    className={classes.fullWidth}
                    size="small"
                >
                    {settings.mods.some(element => !element.outputs.color.enabled) ? 'Choose mod' : 'No mods left. Create new'}
                </MenuButton>
            </MenuTrigger>
            <MenuPopover>
                <MenuList>
                    {
                        settings.mods.map((mod, modIndex) => {
                            if (mod.outputs[paramName].enabled) return null;
                            return (
                                <MenuItem style={{backgroundColor: hslArrToHsl(mod.color, 0.2)}} key={mod.id}
                                          onClick={() => setSettings((draft) => {
                                              draft.mods[modIndex].outputs[paramName].enabled = true;
                                          })}>
                                    {mod.name} ({mod.type})
                                </MenuItem>
                            );
                        })}
                </MenuList>
            </MenuPopover>
        </Menu>
    );
};
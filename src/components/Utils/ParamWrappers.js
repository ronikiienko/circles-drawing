import {
    Button,
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
import {Delete16Regular} from '@fluentui/react-icons';
import React from 'react';
import {hslArrToHsl} from '../../utils/generalUtils';


const useStyles = makeStyles({
    modItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...shorthands.padding('3px'),
        marginBlock: '5px',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    modItemBase: {
        backgroundColor: tokens.colorNeutralStencil1Alpha,
    },
    headerMenuButton: {
        float: 'right',
    },
    removeModButton: {
        marginLeft: '10px',
    },
    baseValueLabel: {
        marginRight: '5px',
    },
});

export const ParamHeader = ({header, children, settings, classes, paramName, setSettings}) => {
    const localClasses = useStyles();
    return (
        <>
            <Text size={400}>{header}</Text>
            <Menu>
                <MenuTrigger>
                    <MenuButton
                        className={localClasses.headerMenuButton}
                        appearance="subtle"
                        disabled={!settings.mods.some(element => !element.outputs[paramName].enabled)}
                        size="small"
                    >
                        {settings.mods.some(element => !element.outputs[paramName].enabled) ? 'Choose mods' : 'No mods left. Create more'}
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
            <div className={mergeClasses(localClasses.modItemBase, localClasses.modItem)}>
                <span>
                    {children}
                </span>
                <span className={localClasses.baseValueLabel}>
                    Base value
                </span>
            </div>
        </>
    );

};
export const ParamMod = ({paramName, settings, modIndex, children, setSettings, classes}) => {
    const localClasses = useStyles();
    const mod = settings.mods[modIndex];
    if (!mod.outputs[paramName].enabled) return null;
    return (
        <>
            <div
                key={mod.id}
                className={localClasses.modItem}
                style={{backgroundColor: hslArrToHsl(mod.color, 0.3)}}
            >
                <div>
                    {children}
                </div>
                <span className={classes.verticallyCentered}>
                    <Text>{mod.name} ({mod.type})</Text>
                    <Button
                        className={localClasses.removeModButton}
                        appearance="subtle"
                        size="small"
                        icon={<Delete16Regular/>}
                        onClick={() => {
                            setSettings(draft => {
                                draft.mods[modIndex].outputs[paramName].enabled = false;
                            });
                        }}
                    ></Button>
                </span>
            </div>
        </>

    );
};
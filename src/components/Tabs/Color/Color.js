import {
    Checkbox,
    Label,
    makeStyles,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    shorthands,
    tokens,
} from '@fluentui/react-components';
import {Circle20Regular, PaintBucket20Filled} from '@fluentui/react-icons';
import React from 'react';
import {hslArrToHsl} from '../../../utils/generalUtils';
import {ConditionalPanel} from '../../Utils/ConditionalPanel';


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
        backgroundColor: hslArrToHsl([255, 100, 100, 0.3]),
    },
});
export const Color = ({classes, handleChange, settings, setSettings}) => {
    const localClasses = useStyles();
    return (
        <>
            <Label title="fill color" className={classes.label}>
                <PaintBucket20Filled/>
                <input
                    value={settings.color.color}
                    className={classes.slider}
                    id="color-color"
                    onChange={handleChange}
                    type="color"
                />
            </Label>
            {settings.mods.map((mod, modIndex) => {
                if (!mod.outputs.color.enabled) return null;
                return (
                    <div className={localClasses.modItem}
                         style={{backgroundColor: hslArrToHsl(mod.color, 0.3)}} key={mod.id}>
                                <span>
                                    {mod.name} ({mod.type})
                                    <Checkbox
                                        id={`mods-${modIndex}-outputs-color-enabled`}
                                        checked={mod.outputs.color.enabled}
                                        onChange={handleChange}
                                    />
                                </span>
                        <br/>
                        <span>
                                    <ConditionalPanel active={mod.outputs.color.enabled}>
                                        <Label className={classes.label}>
                                            <input
                                                value={mod.outputs.color.val2}
                                                className={classes.slider}
                                                id={`mods-${modIndex}-outputs-color-val2`}
                                                onChange={handleChange}
                                                type="color"
                                            />
                                        </Label>
                                    </ConditionalPanel>
                                </span>
                        <br/>
                    </div>
                );
            })}
            <Menu>
                <MenuTrigger>
                    <MenuButton
                        disabled={!settings.mods.some(element => !element.outputs.color.enabled)}
                        className={classes.fullWidth}
                        size="small"
                    >Choose mod
                    </MenuButton>
                </MenuTrigger>
                <MenuPopover>
                    <MenuList>
                        {
                            settings.mods.map((mod, modIndex) => {
                                if (mod.outputs.color.enabled) return null;
                                return (
                                    <MenuItem style={{backgroundColor: hslArrToHsl(mod.color, 0.2)}} key={mod.id}
                                              onClick={() => setSettings((draft) => {
                                                  draft.mods[modIndex].outputs.color.enabled = true;
                                              })}>
                                        {mod.name} ({mod.type})
                                    </MenuItem>
                                );
                            })}
                    </MenuList>
                </MenuPopover>
            </Menu>
            <br/>
            <ConditionalPanel active={settings.shape.strokeOn}>
                <Label title="Stroke color">
                    <Circle20Regular/>
                    <input
                        value={settings.color.strokeColor}
                        className={classes.slider}
                        id="color-strokeColor"
                        onChange={handleChange}
                        type="color"
                    />
                </Label>
                <br/>
            </ConditionalPanel>
        </>
    );
};
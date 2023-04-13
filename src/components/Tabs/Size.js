import {
    Checkbox,
    Input,
    Label,
    makeStyles,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    mergeClasses,
    shorthands,
    Slider,
    Text,
    tokens,
} from '@fluentui/react-components';
import React from 'react';
import {hslArrToHsl} from '../../utils/generalUtils';
import {ConditionalPanel} from '../Utils/ConditionalPanel';


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

export const Size = ({settings, setSettings, handleChange, classes}) => {
    const localClasses = useStyles();
    return (
        <>
            <div className={classes.block}>
                <Text size={600} block>Size</Text>
                <div className={mergeClasses(localClasses.modItemBase, localClasses.modItem)}>
                    <Label className={classes.label}>
                        {/*Size:*/}
                        <Slider
                            min={0}
                            max={1}
                            step={0.005}
                            id="size-size"
                            value={settings.size.size}
                            onChange={handleChange}
                            className={localClasses.sliderSize}
                            size="small"
                        />
                        <Input
                            size="small"
                            value={settings.size.size}
                            className={classes.number}
                            id="size-size"
                            onChange={handleChange}
                            type="text"
                        />
                    </Label>
                </div>
                {settings.mods.map((mod, modIndex) => {
                    if (!mod.outputs.size.enabled) return null;
                    return (
                        <div className={localClasses.modItem}
                             style={{backgroundColor: hslArrToHsl(mod.color, 0.3)}} key={mod.id}>
                                <span>
                                    {mod.name} ({mod.type})
                                    <Checkbox
                                        id={`mods-${modIndex}-outputs-size-enabled`}
                                        checked={mod.outputs.size.enabled}
                                        onChange={handleChange}
                                    />
                                </span>
                            <br/>
                            <span>
                                    <ConditionalPanel active={mod.outputs.size.enabled}>
                                        <Label className={classes.label}>
                                            <Slider
                                                className={localClasses.sliderSize}
                                                min={0}
                                                max={1}
                                                step={0.005}
                                                value={mod.outputs.size.val2}
                                                id={`mods-${modIndex}-outputs-size-val2`}
                                                onChange={handleChange}
                                                size="small"
                                            />
                                        <Input
                                            className={classes.number}
                                            size="small"
                                            value={mod.outputs.size.val2}
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
                            disabled={!settings.mods.some(element => !element.outputs.size.enabled)}
                            className={classes.fullWidth}
                            size="small"
                        >Choose mod
                        </MenuButton>
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            {
                                settings.mods.map((mod, modIndex) => {
                                    if (mod.outputs.size.enabled) return null;
                                    return (
                                        <MenuItem style={{backgroundColor: hslArrToHsl(mod.color, 0.2)}} key={mod.id}
                                                  onClick={() => setSettings((draft) => {
                                                      draft.mods[modIndex].outputs.size.enabled = true;
                                                  })}>
                                            {mod.name} ({mod.type})
                                        </MenuItem>
                                    );
                                })}
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </div>
        </>
    );
};
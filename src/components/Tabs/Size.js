import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Checkbox,
    Input,
    Label,
    makeStyles,
    shorthands,
    Slider,
    tokens,
} from '@fluentui/react-components';
import React from 'react';
import {hslArrToHsl} from '../../utils/generalUtils';
import {ConditionalPanel} from '../Utils/ConditionalPanel';


const useStyles = makeStyles({
    sliderSize: {
        marginLeft: '10px',
        width: '250px',
    },
    modItem: {
        paddingInline: '5px',
        marginBlock: '5px',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
});

export const Size = ({settings, setSettings, handleChange, classes}) => {
    const localClasses = useStyles();
    return (
        <>
            <div className={classes.block}>
                <Label className={classes.label}>
                    Size:
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
                <Accordion
                    collapsible
                    multiple
                >
                    <AccordionItem value="modulators">
                        <AccordionHeader>
                            Modulators
                        </AccordionHeader>
                        <AccordionPanel>
                            {settings.mods.map((mod, modIndex) => {
                                return (
                                    <div className={localClasses.modItem}
                                         style={{backgroundColor: hslArrToHsl(mod.color, 0.3)}} key={mod.id}>
                                        <Label className={classes.label}>
                                            {mod.name} ({mod.type})
                                            <Checkbox
                                                id={`mods-${modIndex}-outputs-size-enabled`}
                                                checked={mod.outputs.size.enabled}
                                                onChange={handleChange}
                                            />
                                            <ConditionalPanel active={mod.outputs.size.enabled}>
                                                <Slider
                                                    min={0}
                                                    max={1}
                                                    step={0.005}
                                                    value={mod.outputs.size.val2}
                                                    id={`mods-${modIndex}-outputs-size-val2`}
                                                    onChange={handleChange}
                                                />
                                                <Input
                                                    className={classes.number}
                                                    size="small"
                                                    value={mod.outputs.size.val2}
                                                />
                                            </ConditionalPanel>
                                        </Label>
                                        <br/>
                                    </div>
                                );
                            })}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};
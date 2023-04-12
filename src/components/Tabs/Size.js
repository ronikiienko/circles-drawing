import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Button,
    Input,
    Label,
    makeStyles,
    Slider,
    Text,
} from '@fluentui/react-components';
import {Add16Regular, Delete16Regular} from '@fluentui/react-icons';
import React from 'react';
import {getDefaultModOutput, modOutputDests} from '../../consts/consts';


const useStyles = makeStyles({
    sliderSize: {
        marginLeft: '10px',
        width: '250px',
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
                            {settings.mods.map((mod, index) => {
                                return (
                                    <React.Fragment key={mod.id}>
                                        <Text>{mod.name} ({mod.type})</Text>
                                        <Button onClick={() => {
                                            setSettings(draft => {
                                                draft.mods[index].outputs.push(getDefaultModOutput());
                                            });
                                        }} size="small" icon={<Add16Regular/>}></Button>
                                        <br/>
                                    </React.Fragment>
                                );
                            })}
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem value="inputs">
                        <AccordionHeader>
                            Inputs
                        </AccordionHeader>
                        <AccordionPanel>
                            {settings.mods.map((mod, modIndex) => {
                                return (
                                    mod.outputs.map((output, outputIndex) => {
                                        if (output.to !== modOutputDests.size) return null;
                                        return (
                                            <div className={classes.row} key={output.id}>
                                                <Text key={output.id}>{mod.name} ({mod.type})</Text>
                                                <Label>
                                                    <Slider
                                                        min={0}
                                                        max={1}
                                                        step={0.005}
                                                        size="small"
                                                        value={output['2']}
                                                        id={`mods-${modIndex}-outputs-${outputIndex}-2`}
                                                        onChange={handleChange}
                                                    />
                                                </Label>
                                                <Button onClick={() => {
                                                    setSettings(draft => {
                                                        draft.mods[modIndex].outputs.splice(outputIndex, 1);
                                                    });
                                                }} size="small" icon={<Delete16Regular/>}></Button>
                                                <br/>
                                            </div>
                                        );
                                    })
                                );
                            })}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};
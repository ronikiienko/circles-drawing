import {
    Button,
    Input,
    Label,
    Link,
    makeStyles,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    Select,
    Slider,
} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import {biasPresets, overlayModes} from '../../consts';
import {useClickAndSet} from '../../hooks/useClickAndSet';
import {BiasGraph} from '../Utils/BiasGraph';
import {CoordinateFlag} from '../Utils/coordinateFlag';


const useStyles = makeStyles({
    biasSection: {
        display: 'flex',
        marginTop: '10px',
        alignItems: 'center',
    },
    biasGraphHelpersContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export const Position = ({settings, setSettings, handleChange, classes}) => {
    const localClasses = useStyles();
    const {setClickAndSetProp, setDragProp} = useClickAndSet({setSettings});
    return (
        <>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Start x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.startX}
                        id="position-startX"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Label className={classes.label}>
                    Start y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.startY}
                        id="position-startY"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Button size="small" id="position-start" onClick={setClickAndSetProp}>Click and set</Button>
            </div>
            <br/>
            <div className={classes.row}>
                <Label className={classes.label}>
                    End x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.endX}
                        id="position-endX"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Label className={classes.label}>
                    End y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.endY}
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Button size="small" id="position-end" onClick={setClickAndSetProp}>Click and set</Button>
            </div>
            <br/>
            <div className={classes.row}>
                <Label className={classes.label}>
                    Bias x:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.biasX}
                        id="position-biasX"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Label className={classes.label}>
                    Bias y:
                    <Input
                        className={classes.number}
                        size="small"
                        value={settings.position.biasY}
                        id="position-biasY"
                        onChange={handleChange}
                        type="text"
                    />
                </Label>
                <Button size="small" id="position-bias" onClick={setClickAndSetProp}>Click and set</Button>
            </div>
            <br/>
            <Label className={classes.label}>
                Overlay:
                <Select
                    size="small"
                    value={settings.position.overlayMode}
                    className={classes.select}
                    id="position-overlayMode"
                    onChange={handleChange}
                >
                    {overlayModes.map(overlayMode =>
                        <option
                            key={overlayMode}
                            value={overlayMode}
                        >
                            {overlayMode}
                        </option>)
                    }
                </Select>
                <InfoButton content={
                    <>
                        Overlay mode adjusts how new layer blends with existing painting.{' '}
                        <Link target="_blank"
                              href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation">Every
                            mode explained here</Link>
                    </>
                }/>
            </Label>
            <br/>
            <div className={localClasses.biasSection}>
                <div>
                    <Label className={classes.label}>
                        Bias A:
                        <Slider
                            size="small"
                            className={classes.slider}
                            value={settings.position.biasA}
                            id="position-biasA"
                            onChange={handleChange}
                            min="0"
                            max="1"
                            step="0.04"
                        />
                    </Label>
                    <br/>
                    <Label className={classes.label}>
                        Bias B:
                        <Slider
                            size="small"
                            className={classes.slider}
                            value={settings.position.biasB}
                            id="position-biasB"
                            onChange={handleChange}
                            min="0"
                            max="1"
                            step="0.04"
                        />
                    </Label>
                    <br/>
                    <Label className={classes.label}>
                        Bias I:
                        <Slider
                            size="small"
                            value={settings.position.biasInf}
                            className={classes.slider}
                            id="position-biasInf"
                            onChange={handleChange}
                            min="0"
                            max="1"
                            step="0.04"
                        />
                    </Label>
                </div>
                <div>
                    <BiasGraph biasInf={settings.position.biasInf} biasA={settings.position.biasA}
                               biasB={settings.position.biasB}/>

                </div>
                <div className={localClasses.biasGraphHelpersContainer}>
                    <InfoButton
                        content={<>
                            <div>
                                On this graph:
                            </div>
                            <br/>
                            <div>

                                <div><strong>X</strong> determines <strong>HOW MANY SHAPES</strong> will be affected by
                                    bias (all width of graph = all
                                    shapes)
                                </div>
                                <div><strong>Y</strong> determines <strong>HOW MUCH AFFECTED</strong> (closer to top =
                                    more affected)
                                </div>
                            </div>
                            <br/>
                            <div>
                                If, for example, the graph will be close to max Y and it will be so through all width,
                                all shapes will be strongly affected (determined by how close to max Y)
                            </div>
                            <br/>
                            <div>
                                For natural bias, graph shouldn't reach maximum Y (it will cause shapes to 'stick' to x
                                and y axis, because bias is 100% then, and no randomness applied to position
                            </div>
                            <br/>
                            <div>
                                For natural bias, also, graph shouldn't look flat, because all biases will be similar
                                then and result will look like a rectangle
                            </div>

                        </>}
                    />
                    <Menu>
                        <MenuTrigger disableButtonEnhancement>
                            <MenuButton appearance="transparent"></MenuButton>
                        </MenuTrigger>
                        <MenuPopover>
                            <MenuList>
                                {Object.entries(biasPresets).map(([presetId, preset]) => {
                                    return (
                                        <MenuItem
                                            onClick={() => {
                                                setSettings(draft => {
                                                    draft.position.biasA = preset.biasA;
                                                    draft.position.biasB = preset.biasB;
                                                    draft.position.biasInf = preset.biasInf;
                                                });
                                            }}
                                            key={presetId}
                                            title={preset.description}
                                        >
                                            {preset.name}
                                        </MenuItem>
                                    );
                                })}
                            </MenuList>
                        </MenuPopover>
                    </Menu>
                </div>
            </div>

            <br/>

            <CoordinateFlag id="position-start" title="Start point" onMouseDown={setDragProp} onTouchStart={setDragProp}
                            settings={settings}
                            color="green"/>
            <CoordinateFlag id="position-end" title="End point" onMouseDown={setDragProp} onTouchStart={setDragProp}
                            settings={settings}
                            color="red"/>
            <CoordinateFlag id="position-bias" title="Bias point" onMouseDown={setDragProp} onTouchStart={setDragProp}
                            settings={settings}
                            color="blue"/>
        </>
    );
};
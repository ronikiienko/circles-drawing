import {Button, Input, Label, Link, makeStyles, Select, Slider} from '@fluentui/react-components';
import {InfoButton} from '@fluentui/react-components/unstable';
import {overlayModes} from '../../consts';
import {useClickAndSet} from '../../hooks/useClickAndSet';
import {BiasGraph} from '../utils/BiasGraph';
import {CoordinateFlag} from '../utils/coordinateFlag';


const useStyles = makeStyles({
    biasSection: {
        display: 'flex',
        marginTop: '10px',
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
                            className={classes.number}
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
                            className={classes.number}
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
                        Bias inf:
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
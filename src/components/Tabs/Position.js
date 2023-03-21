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
import {biasPresets, biasSpiralTypes, biasTypes, overlayModes} from '../../consts';
import {BiasGraph} from '../Utils/BiasGraph';
import {ConditionalPanel} from '../Utils/ConditionalPanel';


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
export const Position = ({settings, setClickAndSetProp, setSettings, handleChange, classes}) => {
    const localClasses = useStyles();
    return (
        <>
            <ConditionalPanel active={settings.position.biasType === biasTypes.rectangular}>
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
            </ConditionalPanel>
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
            <Label className={classes.label}>
                Bias type:
                <Select
                    size="small"
                    value={settings.position.biasType}
                    className={classes.select}
                    id="position-biasType"
                    onChange={handleChange}
                >
                    {Object.values(biasTypes).map(biasType =>
                        <option
                            key={biasType}
                            value={biasType}
                        >
                            {biasType}
                        </option>)
                    }
                </Select>
            </Label>
            <br/>
            <ConditionalPanel active={settings.position.biasType === biasTypes.spiral}>
                <Label className={classes.label}>
                    Spiral type:
                    <Select
                        size="small"
                        value={settings.position.biasSpiralType}
                        className={classes.select}
                        id="position-biasSpiralType"
                        onChange={handleChange}
                    >
                        {Object.values(biasSpiralTypes).map(biasSpiralType =>
                            <option
                                key={biasSpiralType}
                                value={biasSpiralType}
                            >
                                {biasSpiralType}
                            </option>)
                        }
                    </Select>
                </Label>
                <br/>
                <ConditionalPanel active={settings.position.biasSpiralType === biasSpiralTypes.custom}>
                    <Label className={classes.label}>
                        Custom spiral formula:
                        <Input
                            className={classes.text}
                            size="small"
                            value={settings.position.biasSpiralCustom}
                            id="position-biasSpiralCustom"
                            onChange={handleChange}
                            type="text"
                        />
                        <InfoButton content={
                            <>
                                The spiral is generated by moving circular, with each new point making angle bigger
                                (also this angle determines how far point is from center)
                                <br/>
                                This formula should determine distance from center of each point.
                                <br/>
                                This formula should also use only vanilla JS Math methods.
                                <br/>
                                Current angle of the point can be accessed as <code>angleRad</code> variable.
                                <br/>
                                It offers really huge variety of different spirals, feel free to experiment by trying
                                different functions, roots, powers, trigonometric functions e.t.c
                                <br/>
                                Some examples: <br/>
                                Four leaf preset formula: <code> angleRad * Math.sin(angleRad * 2)</code>
                                <br/>
                                Six leaf: <code>angleRad * Math.sin(angleRad * 1.5)</code>
                                <br/>
                                Strange tube: <code>angleRad * 4 * Math.sin(Math.pow(angleRad, 1) * 0.95)</code>
                                <br/>
                                Inside-outside: <code>angleRad * Math.sin(Math.pow(angleRad, 1 / 4))</code>
                            </>
                        }/>
                    </Label>
                    <br/>
                </ConditionalPanel>
                <Label className={classes.label}>
                    Spiral mult:
                    <Slider
                        size="small"
                        className={classes.slider}
                        value={settings.position.biasSpiralMult}
                        id="position-biasSpiralMult"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.01"
                    />
                    <InfoButton content={
                        <>
                            Spiral multiplier adjusts how &apos;opened&apos; the spiral looks. Basically it just
                            multiplies all distances from center. If it&apos;s small, it makes spiral more squashed to
                            center.
                        </>
                    }/>
                </Label>
                <Label className={classes.label}>
                    Spiral thick
                    <Slider
                        size="small"
                        className={classes.slider}
                        value={settings.position.biasSpiralThickness}
                        id="position-biasSpiralThickness"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.01"
                    />
                    <InfoButton content={
                        <>
                            Allows you to adjust how many shapes &apos;thick&apos; will spiral be.
                            <br/>
                            High values will make all spiral points have many shapes instead of one.
                            <br/>
                            To see effect, adjust also spiral spread, which determine how far will those additional
                            shapes spread.
                        </>
                    }/>
                </Label>
                <Label className={classes.label}>
                    Spiral dens:
                    <Slider
                        size="small"
                        className={classes.slider}
                        value={settings.position.biasSpiralDensity}
                        id="position-biasSpiralDensity"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.01"
                    />
                    <InfoButton content={
                        <>
                            The spiral is generated by moving circular, with each new point making angle bigger (also
                            this angle determines how far point is from center)
                            <br/>
                            Spiral density determines how much this angle will be increased with every new point.
                        </>
                    }/>
                </Label>
                <Label className={classes.label}>
                    Spiral spread:
                    <Slider
                        size="small"
                        className={classes.slider}
                        value={settings.position.biasSpiralSpread}
                        id="position-biasSpiralSpread"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.01"
                    />
                    <InfoButton content={
                        <>
                            Related to spiral thickness.
                            <br/>
                            Spiral spread determines how far will additional shapes created by spiral thickness spread.
                            <br/>
                            This is also a parameter that depends on bias.
                            <br/>
                            High bias values will squash all additional shapes.
                        </>
                    }/>
                </Label>
                <Label className={classes.label}>
                    Spiral angle rand:
                    <Slider
                        size="small"
                        className={classes.slider}
                        value={settings.position.biasSpiralAngleRand}
                        id="position-biasSpiralAngleRand"
                        onChange={handleChange}
                        min="0"
                        max="1"
                        step="0.01"
                    />
                    <InfoButton content={
                        <>
                            Related to spiral density.
                            <br/>
                            If you try to create spiral without spiral angle randomness, you will find out that it looks
                            like &apos;Straight lines are coming out from the center&apos;.
                            <br/>
                            It happens because spiral density is constant, and increases angle the same every time.
                            Spiral angle randomness make it more random.
                            <br/>
                            If you wish make spiral look more organic, you may increase this parameter.
                        </>
                    }/>
                </Label>
            </ConditionalPanel>
            <ConditionalPanel active={settings.position.biasType === biasTypes.radial}>
                <div className={classes.row}>
                    <Label className={classes.label}>
                        Radius X:
                        <Input
                            className={classes.number}
                            size="small"
                            value={settings.position.biasRadiusX}
                            id="position-biasRadiusX"
                            onChange={handleChange}
                            type="text"
                        />
                    </Label>
                    <Label className={classes.label}>
                        Radius Y:
                        <Input
                            className={classes.number}
                            size="small"
                            value={settings.position.biasRadiusY}
                            id="position-biasRadiusY"
                            onChange={handleChange}
                            type="text"
                        />
                    </Label>
                    <Button size="small" id="position-biasRadius" onClick={setClickAndSetProp}>Click and set</Button>
                </div>
            </ConditionalPanel>
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
                                You can reach desired effect by manipulating three parameters (biasA, biasB, biasInf)
                            </div>
                            <br/>
                            <div>
                                Bias can play different roles in different types of bias, but generally it makes shapes
                                have higher chance of spawning in some certain place rather than fully random.
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


        </>
    );
};
import {makeStyles, shorthands, tokens} from '@fluentui/react-components';
import React from 'react';
import {biasTanhFunction} from '../../utils/generalUtils';
import {getTranslatedBiasA, getTranslatedBiasB} from '../../utils/translaters';


const numberOfCircles = 50;
const svgSize = 70;

const useStyles = makeStyles({
    svg: {
        ...shorthands.borderColor('black'),
        ...shorthands.borderWidth('1px'),
        ...shorthands.borderStyle('solid'),
    },
});
export const BiasGraph = ({biasInf, biasA, biasB}) => {
    const localClasses = useStyles();
    const [path, setPath] = React.useState(`M 0 ${svgSize}`);

    React.useEffect(() => {
        let internalPath = `M 0 ${svgSize}`;
        const biasATranslated = getTranslatedBiasA(biasA);
        const biasBTranslated = getTranslatedBiasB(biasB);
        new Array(numberOfCircles).fill(undefined).forEach((value, index) => {
            const x = 1 / (numberOfCircles - 1) * index;
            const y = biasTanhFunction(x, biasInf, biasATranslated, biasBTranslated);
            const svgX = x * svgSize;
            const svgY = svgSize - y * svgSize;
            internalPath = internalPath + `L ${svgX} ${svgY}`;
        });
        setPath(internalPath);
    }, [biasInf, biasA, biasB]);

    return (
        <svg className={localClasses.svg} width={svgSize} height={svgSize}>
            <path d={path} fill="none" stroke={tokens.colorPaletteGrapeBorderActive}></path>
        </svg>
    );
};

// TODO rerenders a lot
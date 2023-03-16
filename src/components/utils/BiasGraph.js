import React from 'react';
import {translateBiasA, translateBiasB} from '../../draw';
import {biasTanhFunction} from '../../utils';


const numberOfCircles = 50;
const svgSize = 100;
export const BiasGraph = ({biasInf, biasA, biasB}) => {
    let path = `M 0 ${svgSize}`;
    const biasATranslated = translateBiasA(biasA);
    const biasBTranslated = translateBiasB(biasB);
    {
        new Array(numberOfCircles).fill(undefined).forEach((value, index) => {
            const x = 1 / (numberOfCircles - 1) * index;
            const y = biasTanhFunction(x, biasInf, biasATranslated, biasBTranslated);
            const svgX = x * svgSize;
            const svgY = svgSize - y * svgSize;
            path = path + `L ${svgX} ${svgY}`;
        });
    }
    console.log('hi');
    return (
        <svg style={{border: '1px solid black'}} width={svgSize} height={svgSize}>
            <path d={path} fill="none" stroke="blueviolet"></path>
        </svg>
    );
};

// TODO rerenders a lot
import {bilinearInterp} from './generalUtils';


export const valueNoise = () => {
    const permutationTable = [];
    for (let i = 0; i < 256; i++) {
        permutationTable[i] = [];
        for (let j = 0; j < 256; j++) {
            permutationTable[i][j] = Math.random();
        }
    }
    return (x, y) => {
        const xLeftTop = Math.trunc(x % 256);
        const yLeftTop = Math.trunc(y % 256);
        const dx = x % 1;
        const dy = y % 1;

        const p1 = permutationTable[xLeftTop][yLeftTop];
        const p2 = permutationTable[(xLeftTop + 1) % 256][yLeftTop];
        const p3 = permutationTable[xLeftTop][(yLeftTop + 1) % 256];
        const p4 = permutationTable[(xLeftTop + 1) % 256][(yLeftTop + 1) % 256];

        return bilinearInterp(p1, p2, p3, p4, dx, dy);
    };
};
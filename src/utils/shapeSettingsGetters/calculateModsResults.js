import {modTypes} from '../../consts/sharedConsts';
import {clampValueToRange, modRemap} from '../generalUtils';
import {indexMod, noiseMod, radialMod, trigMod} from './mods';


export const calculateModsResults = (settings, x, y, absoluteIndex, indexOfBranch, indexInBranch) => {
    const modsResultsTemp = {};
    const modsResults = {};
    settings.mods.forEach((mod) => {
        // TODO launch this conditionaly (if no outputs not calculate)
        // TODO if for example angle mod is on, but shape is circle, not calculate it
        let value;
        switch (mod.settings.type) {
            case modTypes.radial.id:
                value = radialMod(x, y, mod);
                break;
            case modTypes.noise.id:
                value = noiseMod(x, y, mod);
                break;
            case modTypes.index.id:
                value = indexMod(absoluteIndex, indexOfBranch, indexInBranch, settings.number.number, mod, settings);
                break;
            case modTypes.trig.id:
                value = trigMod(x, y, mod);
                break;
        }
        if (value < 0 || value > 1) throw `Mod value is out of range: ${value}`;
        value = modRemap(value, mod.settings.modA, mod.settings.modB);
        modsResultsTemp[mod.id] = value;
        modsResults[mod.id] = value;
    });
    settings.mods.forEach(mod => {
        mod.modOutputs.forEach((output) => {
            const affectAmount = (modsResults[output.id] * modsResultsTemp[mod.id] - modsResults[output.id]) * output.mult;
            modsResults[output.id] = clampValueToRange(0, 1, modsResults[output.id] + affectAmount);
        });
    });
    return modsResults;
};
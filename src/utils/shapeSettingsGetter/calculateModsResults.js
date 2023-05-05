import {modTypes} from '../../consts/sharedConsts';
import {clampValueToRange} from '../generalUtils';
import {indexMod, noiseMod, radialMod, trigMod} from '../layerSettings/mods';


export const calculateModsResults = (settings, x, y, absoluteIndex, branchIndex) => {
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
                value = indexMod(absoluteIndex, settings.number.number, mod);
                break;
            case modTypes.trig.id:
                value = trigMod(x, y, mod);
                break;
        }
        value = clampValueToRange(0, 1, value);
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
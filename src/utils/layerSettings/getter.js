import {getDefaultMod, layerPresets} from '../../consts/consts';
import {deepCopy} from '../generalUtils';


export const getLayerSettings = (preset) => {
    const defaultPreset = layerPresets[0];
    return {
        preset: {
            id: preset?.preset?.id ?? defaultPreset.preset.id,
            name: preset?.preset?.name ?? defaultPreset.preset.name,
            description: preset?.preset?.description ?? defaultPreset.preset.description,
        },
        size: {
            size: preset?.size?.size ?? defaultPreset.size.size,
        },
        number: {
            number: preset?.number?.number ?? defaultPreset.number.number,
        },
        shape: {
            shape: preset?.shape?.shape ?? defaultPreset.shape.shape,
            angle: preset?.shape?.angle ?? defaultPreset.shape.angle,
            angleRand: preset?.shape?.angleRand ?? defaultPreset.shape.angleRand,
            widthRatio: preset?.shape?.widthRatio ?? defaultPreset.shape.widthRatio,
            lookToOn: preset?.shape?.lookToOn ?? defaultPreset.shape.lookToOn,
            lookToX: preset?.shape?.lookToX ?? defaultPreset.shape.lookToX,
            lookToY: preset?.shape?.lookToY ?? defaultPreset.shape.lookToY,
            rectRoundness: preset?.shape?.rectRoundness ?? defaultPreset.shape.rectRoundness,
            // TODO also merge with default custom shape array
            customShape: deepCopy(preset?.shape?.customShape) ?? deepCopy(defaultPreset.shape.customShape),
            strokeOn: preset?.shape?.strokeOn ?? defaultPreset.shape.strokeOn,
            strokeThickness: preset?.shape?.strokeThickness ?? defaultPreset.shape.strokeThickness,
            fillOn: preset?.shape?.fillOn ?? defaultPreset.shape.fillOn,
            pixelShapeRes: preset?.shape?.pixelShapeRes ?? defaultPreset.shape.pixelShapeRes,
            pixelShape: deepCopy(preset?.shape?.pixelShape) ?? deepCopy(defaultPreset.shape.pixelShape),
        },
        mods: preset?.mods.map((mod) => {
            const defaultMod = getDefaultMod();
            return {
                name: mod?.name ?? defaultMod.name,
                type: mod?.type ?? defaultMod.type,
                id: mod?.id ?? defaultMod.id,
                color: mod?.color ?? defaultMod.color,
                radialRadiusX: mod?.radialRadiusX ?? defaultMod.radialRadiusX,
                radialRadiusY: mod?.radialRadiusY ?? defaultMod.radialRadiusY,
                radialCenterX: mod?.radialCenterX ?? defaultMod.radialCenterX,
                radialCenterY: mod?.radialCenterY ?? defaultMod.radialCenterY,
                perlinZoom: mod?.perlinZoom ?? defaultMod.perlinZoom,
                modA: mod?.modA ?? defaultMod.modA,
                modB: mod?.modB ?? defaultMod.modB,
                blendRatio: mod?.blendRatio ?? defaultMod.blendRatio,
                outputs: {
                    size: {
                        enabled: mod?.outputs?.size?.enabled ?? defaultMod.outputs.size.enabled,
                        val2: mod?.outputs?.size?.val2 ?? defaultMod.outputs.size.val2,
                    },
                    color: {
                        enabled: mod?.outputs?.color?.enabled ?? defaultMod.outputs.color.enabled,
                        val2: mod?.outputs?.color?.val2 ?? defaultMod.outputs.color.val2,
                    },
                    strokeColor: {
                        enabled: mod?.outputs?.strokeColor?.enabled ?? defaultMod.outputs.strokeColor.enabled,
                        val2: mod?.outputs?.strokeColor?.val2 ?? defaultMod.outputs.strokeColor.val2,
                    },
                    transp: {
                        enabled: mod?.outputs?.transp?.enabled ?? defaultMod.outputs.transp.enabled,
                        val2: mod?.outputs?.transp?.val2 ?? defaultMod.outputs.transp.val2,
                    },
                    strokeTransp: {
                        enabled: mod?.outputs?.strokeTransp?.enabled ?? defaultMod.outputs.strokeTransp.enabled,
                        val2: mod?.outputs?.strokeTransp?.val2 ?? defaultMod.outputs.strokeTransp.val2,
                    },
                    blur: {
                        enabled: mod?.outputs?.blur?.enabled ?? defaultMod.outputs.blur.enabled,
                        val2: mod?.outputs?.blur?.val2 ?? defaultMod.outputs.blur.val2,
                    },
                },
                modOutputs: mod?.modOutputs?.reduce((accumulator, modOutput, modOutputIndex) => {
                    if (modOutput?.id) accumulator.push({
                        id: modOutput?.id,
                    });
                    return accumulator;
                }, []) ?? [],
            };
        }) ?? [],
        position: {
            startX: preset?.position?.startX ?? defaultPreset.position.startX,
            startY: preset?.position?.startY ?? defaultPreset.position.startY,
            endX: preset?.position?.endX ?? defaultPreset.position.endX,
            endY: preset?.position?.endY ?? defaultPreset.position.endY,
            biasType: preset?.position?.biasType ?? defaultPreset.position.biasType,
            biasSpiralType: preset?.position?.biasSpiralType ?? defaultPreset.position.biasSpiralType,
            biasSpiralCustom: preset?.position?.biasSpiralCustom ?? defaultPreset.position.biasSpiralCustom,
            biasSpiralThickness: preset?.position?.biasSpiralThickness ?? defaultPreset.position.biasSpiralThickness,
            biasSpiralDensity: preset?.position?.biasSpiralDensity ?? defaultPreset.position.biasSpiralDensity,
            biasSpiralSpread: preset?.position?.biasSpiralSpread ?? defaultPreset.position.biasSpiralSpread,
            biasSpiralAngleRand: preset?.position?.biasSpiralAngleRand ?? defaultPreset.position.biasSpiralAngleRand,
            biasSpiralMult: preset?.position?.biasSpiralMult ?? defaultPreset.position.biasSpiralMult,
            biasRadiusX: preset?.position?.biasRadiusX ?? defaultPreset.position.biasRadiusX,
            biasRadiusY: preset?.position?.biasRadiusY ?? defaultPreset.position.biasRadiusY,
            biasX: preset?.position?.biasX ?? defaultPreset.position.biasX,
            biasY: preset?.position?.biasY ?? defaultPreset.position.biasY,
            biasA: preset?.position?.biasA ?? defaultPreset.position.biasA,
            biasB: preset?.position?.biasB ?? defaultPreset.position.biasB,
            biasInf: preset?.position?.biasInf ?? defaultPreset.position.biasInf,
            biasRectXOn: preset?.position?.biasRectXOn ?? defaultPreset.position.biasRectXOn,
            biasRectYOn: preset?.position?.biasRectYOn ?? defaultPreset.position.biasRectYOn,
            gradOn: preset?.position?.gradOn ?? defaultPreset.position.gradOn,
            gradA: preset?.position?.gradA ?? defaultPreset.position.gradA,
            gradB: preset?.position?.gradB ?? defaultPreset.position.gradB,
            gradInf: preset?.position?.gradInf ?? defaultPreset.position.gradInf,
        },
        color: {
            color: preset?.color?.color ?? defaultPreset.color.color,
            strokeColor: preset?.color?.strokeColor ?? defaultPreset.color.strokeColor,
            glow: preset?.color?.glow ?? defaultPreset.color.glow,
            transp: preset?.color?.transp ?? defaultPreset.color.transp,
            strokeTransp: preset?.color?.strokeTransp ?? defaultPreset.color.strokeTransp,
            overlayMode: preset?.color?.overlayMode ?? defaultPreset.color.overlayMode,
            blurOn: preset?.color?.blurOn ?? defaultPreset.color.blurOn,
            blur: preset?.color?.blur ?? defaultPreset.color.blur,
        },
        brush: {
            brushDensity: preset?.brush?.brushDensity ?? defaultPreset.brush.brushDensity,
            brushOn: preset?.brush?.brushOn ?? defaultPreset.brush.brushOn,
            brushX: preset?.brush?.brushX ?? defaultPreset.brush.brushX,
            brushY: preset?.brush?.brushY ?? defaultPreset.brush.brushY,
        },
    };
};
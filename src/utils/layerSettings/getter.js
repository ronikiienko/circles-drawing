import {getCustomShapePoint, getDefaultMod, getDefaultModOutput, layerPresets} from '../../consts/consts';
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
            widthRatio: preset?.shape?.widthRatio ?? defaultPreset.shape.widthRatio,
            rectRoundness: preset?.shape?.rectRoundness ?? defaultPreset.shape.rectRoundness,
            // TODO also merge with default custom shape array
            // TODO remove array check (x as 0 element etc..) it just supports older version
            customShape: preset?.shape?.customShape?.map((point) => {
                const defaultPoint = getCustomShapePoint();
                return {
                    x: point?.x ?? point?.[0] ?? defaultPoint.x,
                    y: point?.y ?? point?.[1] ?? defaultPoint.y,
                    id: point?.id ?? point?.[2] ?? defaultPoint.id,
                    color: point?.color ?? point?.[3] ?? defaultPoint.color,
                };
            }) ?? [],
            strokeOn: preset?.shape?.strokeOn ?? defaultPreset.shape.strokeOn,
            strokeThickness: preset?.shape?.strokeThickness ?? defaultPreset.shape.strokeThickness,
            fillOn: preset?.shape?.fillOn ?? defaultPreset.shape.fillOn,
            pixelShapeRes: preset?.shape?.pixelShapeRes ?? defaultPreset.shape.pixelShapeRes,
            pixelShape: deepCopy(preset?.shape?.pixelShape) ?? deepCopy(defaultPreset.shape.pixelShape),
        },
        mods: preset?.mods?.map((mod) => {
            const defaultMod = getDefaultMod();
            return {
                name: mod?.name ?? defaultMod.name,
                type: mod?.type ?? defaultMod.type,
                id: mod?.id ?? defaultMod.id,
                color: mod?.color ?? defaultMod.color,
                radialRadiusPos: {
                    x: mod?.radialRadiusPos?.x ?? defaultMod.radialRadiusPos.x,
                    y: mod?.radialRadiusPos?.y ?? defaultMod.radialRadiusPos.y,
                },
                radialCenterPos: {
                    x: mod?.radialCenterPos?.x ?? defaultMod.radialCenterPos.x,
                    y: mod?.radialCenterPos?.y ?? defaultMod.radialCenterPos.y,
                },
                sineZoomX: mod?.sineZoomX ?? defaultMod.sineZoomX,
                sineZoomY: mod?.sineZoomY ?? defaultMod.sineZoomY,
                trigType: mod?.trigType ?? defaultMod.trigType,
                noiseType: mod?.noiseType ?? defaultMod.noiseType,
                noiseZoom: mod?.noiseZoom ?? defaultMod.noiseZoom,
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
                    widthRatio: {
                        enabled: mod?.outputs?.widthRatio?.enabled ?? defaultMod.outputs.widthRatio.enabled,
                        val2: mod?.outputs?.widthRatio?.val2 ?? defaultMod.outputs.widthRatio.val2,
                    },
                    rectRoundness: {
                        enabled: mod?.outputs?.rectRoundness?.enabled ?? defaultMod.outputs.rectRoundness.enabled,
                        val2: mod?.outputs?.rectRoundness?.val2 ?? defaultMod.outputs.rectRoundness.val2,
                    },
                    angle: {
                        enabled: mod?.outputs?.angle?.enabled ?? defaultMod.outputs.angle.enabled,
                        val2: mod?.outputs?.angle?.val2 ?? defaultMod.outputs.angle.val2,
                    },
                    lookTo: {
                        enabled: mod?.outputs?.lookTo?.enabled ?? defaultMod.outputs.lookTo.enabled,
                        val2: {
                            x: mod?.outputs?.lookTo?.val2?.x ?? defaultMod.outputs.lookTo.val2.x,
                            y: mod?.outputs?.lookTo?.val2?.y ?? defaultMod.outputs.lookTo.val2.y,
                        },
                    },
                    xOffset: {
                        enabled: mod?.outputs?.xOffset?.enabled ?? defaultMod.outputs.xOffset.enabled,
                        val2: mod?.outputs?.xOffset?.val2 ?? defaultMod.outputs.xOffset.val2,
                    },
                    yOffset: {
                        enabled: mod?.outputs?.yOffset?.enabled ?? defaultMod.outputs.yOffset.enabled,
                        val2: mod?.outputs?.yOffset?.val2 ?? defaultMod.outputs.yOffset.val2,
                    },
                    branchesMagnitude: {
                        enabled: mod?.outputs?.branchesMagnitude?.enabled ?? defaultMod.outputs.branchesMagnitude.enabled,
                        val2: mod?.outputs?.branchesMagnitude?.val2 ?? defaultMod.outputs.branchesMagnitude.val2,
                    },
                },
                modOutputs: mod?.modOutputs?.map((modOutput) => {
                    const defaultModOutput = getDefaultModOutput();
                    return {
                        id: modOutput?.id ?? defaultModOutput.id,
                        mult: modOutput?.mult ?? defaultModOutput.mult,
                    };
                }) ?? [],
            };
        }) ?? [],
        position: {
            startPos: {
                x: preset?.position?.startPos?.x ?? defaultPreset.position.startPos.x,
                y: preset?.position?.startPos?.y ?? defaultPreset.position.startPos.y,
            },
            endPos: {
                x: preset?.position?.endPos?.x ?? defaultPreset.position.endPos.x,
                y: preset?.position?.endPos?.y ?? defaultPreset.position.endPos.y,
            },
            branchesOn: preset?.position?.branchesOn ?? defaultPreset.position.branchesOn,
            branchesLength: preset?.position?.branchesLength ?? defaultPreset.position.branchesLength,
            branchesMagnitude: preset?.position?.branchesMagnitude ?? defaultPreset.position.branchesMagnitude,
            biasType: preset?.position?.biasType ?? defaultPreset.position.biasType,
            chessPlateWidth: preset?.position?.chessPlateWidth ?? defaultPreset.position.chessPlateWidth,
            chessPlateHeight: preset?.position?.chessPlateHeight ?? defaultPreset.position.chessPlateHeight,
            biasSpiralType: preset?.position?.biasSpiralType ?? defaultPreset.position.biasSpiralType,
            biasSpiralCustom: preset?.position?.biasSpiralCustom ?? defaultPreset.position.biasSpiralCustom,
            biasSpiralThickness: preset?.position?.biasSpiralThickness ?? defaultPreset.position.biasSpiralThickness,
            biasSpiralDensity: preset?.position?.biasSpiralDensity ?? defaultPreset.position.biasSpiralDensity,
            biasSpiralSpread: preset?.position?.biasSpiralSpread ?? defaultPreset.position.biasSpiralSpread,
            biasSpiralAngleRand: preset?.position?.biasSpiralAngleRand ?? defaultPreset.position.biasSpiralAngleRand,
            biasSpiralMult: preset?.position?.biasSpiralMult ?? defaultPreset.position.biasSpiralMult,
            biasRadiusPos: {
                x: preset?.position?.biasRadiusPos?.x ?? defaultPreset.position.biasRadiusPos.x,
                y: preset?.position?.biasRadiusPos?.y ?? defaultPreset.position.biasRadiusPos.y,
            },
            biasPos: {
                x: preset?.position?.biasPos?.x ?? defaultPreset.position.biasPos.x,
                y: preset?.position?.biasPos?.y ?? defaultPreset.position.biasPos.y,
            },
            biasA: preset?.position?.biasA ?? defaultPreset.position.biasA,
            biasB: preset?.position?.biasB ?? defaultPreset.position.biasB,
            biasInf: preset?.position?.biasInf ?? defaultPreset.position.biasInf,
            biasRectXOn: preset?.position?.biasRectXOn ?? defaultPreset.position.biasRectXOn,
            biasRectYOn: preset?.position?.biasRectYOn ?? defaultPreset.position.biasRectYOn,
            xOffset: preset?.position?.xOffset ?? defaultPreset.position.xOffset,
            yOffset: preset?.position?.yOffset ?? defaultPreset.position.yOffset,
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
            brushPos: {
                x: preset?.brush?.brushPos?.x ?? defaultPreset.brush.brushPos.x,
                y: preset?.brush?.brushPos?.y ?? defaultPreset.brush.brushPos.y,
            },
        },
    };
};
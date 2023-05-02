import {defaultNavState} from '../../consts/consts';


export const getNavState = (navState) => {
    return {
        mainTab: navState?.mainTab ?? defaultNavState.mainTab,
        modsAccordion:
            Array.isArray(navState?.modsAccordion)
                ? navState?.modsAccordion?.map(item => {
                    return item;
                })
                : [],
        presetsAccordion:
            Array.isArray(navState?.presetsAccordion)
                ? navState?.presetsAccordion?.map(item => {
                    return item;
                })
                : [],
    };
};
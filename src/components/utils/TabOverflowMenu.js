import {
    Button,
    Menu,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    useIsOverflowItemVisible,
    useOverflowMenu,
} from '@fluentui/react-components';
import {MoreHorizontal16Regular} from '@fluentui/react-icons';
import React from 'react';


const TabOverflowMenuItem = ({id, label, setTab}) => {
    const isVisible = useIsOverflowItemVisible(id);

    if (isVisible) {
        return null;
    }

    // As an union between button props and div props may be conflicting, casting is required
    return <MenuItem appearance="transparent" onClick={() => setTab(id)}>{label}</MenuItem>;
};
export const TabOverflowMenu = ({tabs, setTab}) => {
    const {ref, overflowCount, isOverflowing} =
        useOverflowMenu();

    if (!isOverflowing) {
        return null;
    }

    return (
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <Button
                    appearance="transparent"
                    ref={ref}
                    icon={<MoreHorizontal16Regular/>}
                >
                </Button>
            </MenuTrigger>

            <MenuPopover>
                <MenuList>
                    {tabs.map((tab) => {
                        return <TabOverflowMenuItem setTab={setTab} key={tab.id} id={tab.id} label={tab.label}/>;
                    })}
                </MenuList>
            </MenuPopover>
        </Menu>
    );
};
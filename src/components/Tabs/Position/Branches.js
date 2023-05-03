import {Input, Label, Switch} from '@fluentui/react-components';
import React from 'react';
import {ConditionalPanel} from '../../Shared/ConditionalPanel';


export const Branches = ({settings, classes, handleChange, setSettings}) => {
    return (
        <>
            <Label className={classes.label}>
                Branches:
                <Switch
                    size="small"
                    id="position-branchesOn"
                    onChange={handleChange}
                    checked={settings.position.branchesOn}
                />
            </Label>
            <ConditionalPanel active={settings.position.branchesOn}>
                <br/>
                <Label className={classes.label}>
                    Branches length:
                    <Input
                        size="small"
                        className={classes.number}
                        id="position-branchesLength"
                        onChange={handleChange}
                        value={settings.position.branchesLength}
                    />
                </Label>
            </ConditionalPanel>
        </>
    );
};
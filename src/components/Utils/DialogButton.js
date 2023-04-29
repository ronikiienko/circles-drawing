import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
} from '@fluentui/react-components';
import React from 'react';


export const DialogButton = ({
                                 type = 'modal',
                                 onSubmit = () => {
                                 },
                                 header,
                                 description,
                                 icon,
                                 appearance,
                                 className,
                                 children,
                                 onOpenChange,
                             }) => {
    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger modalType={type} disableButtonEnhancement>
                <Button onClick={(event) => {
                    event.stopPropagation();
                }} icon={icon} appearance={appearance} className={className}>{children}</Button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>{header}</DialogTitle>
                    <DialogContent>
                        {description}
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button onClick={(event) => {
                                event.stopPropagation();
                            }} appearance="secondary">No</Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                            <Button onClick={(event) => {
                                onSubmit();
                            }} appearance="primary">Yes</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
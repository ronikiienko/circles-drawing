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
                             }) => {
    const buttonRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        if (open && buttonRef.current) {
            buttonRef.current.focus();
        }
    }, [open]);
    return (
        <Dialog
            open={open}
            onOpenChange={(event, data) => setOpen(data.open)}
            inertTrapFocus
        >
            <DialogTrigger modalType={type} disableButtonEnhancement>
                <Button onClick={(event) => {
                    event.stopPropagation();
                }} icon={icon} appearance={appearance} className={className}>{children}</Button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
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
                        <Button
                            onClick={(event) => {
                                setOpen(false);
                                onSubmit(event);
                            }}
                            ref={buttonRef}
                            appearance="primary"
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
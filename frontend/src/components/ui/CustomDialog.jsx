import React from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from './button';
import { BiPlus } from 'react-icons/bi';

const CustomDialog = ({
    triggerLabel = "Open Dialog",
    triggerIcon = '',
    title = "Dialog Title",
    description = "Dialog description goes here.",
    children,
    onSubmit = () => { },
    showCancel = true,
    submitLabel = "Submit",
    customCss = '',
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    variant="outline"
                    className={`font-medium flex gap-2  items-center md:text-lg text-base hover:cursor-pointer rounded-md ${customCss}`}
                >
                    {triggerIcon}
                    <div className="m-0 text-sm ">{triggerLabel}</div>
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {/* Custom Content */}
                {children}

                <DialogFooter>
                    <div className="w-full flex items-center gap-2 overflow-auto justify-end">
                        {showCancel && (
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                        )}
                        <DialogClose asChild>
                            <Button type="submit" onClick={onSubmit}>
                                {submitLabel}
                            </Button>
                        </DialogClose>

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;

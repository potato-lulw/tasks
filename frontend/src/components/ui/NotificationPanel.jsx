import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Button } from './button';

const notifications = [
    { id: 1, message: "New comment on your post" },
    { id: 2, message: "Your task was marked as complete" },
    { id: 3, message: "New user joined your team" },
];

const NotificationPanel = () => {
    const [open, setOpen] = useState(false);

    const handleMarkAllRead = () => {
        // Your logic here
        console.log("Marked all as read");
        setOpen(false); // 👈 Close dropdown
    };

    const handleCancel = () => {
        setOpen(false); // 👈 Close dropdown
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button className="relative flex items-center">
                    <IoIosNotificationsOutline size={24} />

                    {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            {notifications.length}
                        </span>
                    )}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="max-w-60 p-2 space-y-2">
                <div className="max-h-60 overflow-y-auto space-y-1 max-w-60">
                    {notifications.length ? (
                        notifications.map((notif) => (
                            <DropdownMenuItem
                                key={notif.id}
                                className="flex items-start gap-2 py-2 hover:bg-muted"
                            >
                                <HiBellAlert className="mt-1 text-yellow-500" />
                                <div className='w-full'>
                                    <div className='flex flex-row justify-between items-center'>

                                        <p>Alert</p>
                                        <p>9 Days ago</p>
                                    </div>
                                    <span
                                        className="text-sm text-ellipsis  w-full line-clamp-1"
                                        title={notif.message}
                                    >
                                        {notif.message}
                                    </span>
                                </div>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="text-center text-sm text-muted-foreground p-2">
                            No notifications
                        </div>
                    )}
                </div>

                <div className="flex justify-between gap-2">
                    <Button variant="outline" className="w-1/2 text-sm" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="outline" className="w-1/2 text-sm" onClick={handleMarkAllRead}>
                        Mark All Read
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationPanel;

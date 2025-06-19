import React, { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Button } from './button';
import { useGetNotificationsQuery, useReadNotificationMutation } from '@/redux/slices/api/userApiSlice';
import { getDaysAgo } from '@/utils/utils';
import { toast } from 'sonner';

// const notifications = [
//     { id: 1, message: "New comment on your post" },
//     { id: 2, message: "Your task was marked as complete" },
//     { id: 3, message: "New user joined your team" },
// ];




const NotificationPanel = () => {
    const [ open, setOpen ] = useState(false);
    const { data: getNotifications, error: notificationError } = useGetNotificationsQuery();
    const [notifications, setNotifications] = useState([]);
    const [readNotification] = useReadNotificationMutation();

    useEffect(() => {
        if(getNotifications) {
            setNotifications(getNotifications);
            console.log("Notifications fetched: ", getNotifications);
        } else {
            console.log("No notifications found: ", notificationError);
            setNotifications([]);
        }
    }, [getNotifications, notificationError]);

    const handleMarkAllRead = async () => {
        // Your logic here
        try {
            await readNotification({ isReadType: "all" }).unwrap();
            setNotifications([]); // Clear notifications after marking all as read
            toast.success("All notifications marked as read");
        } catch (error) {
            console.error("Error marking all notifications as read:", error);
            toast.error("Failed to mark all notifications as read: " + (error.data?.message || error.message));
            
        }
        setOpen(false); // 👈 Close dropdown
    };

    const handleCancel = () => {
        setOpen(false); // 👈 Close dropdown
    };

    const handleSingleNotificationClick = async (id) => {
        try {
            await readNotification({ id, isReadType: "single" }).unwrap();
            setNotifications((prev) => prev.filter((notif) => notif._id !== id));
            toast.success("Notification marked as read");
        } catch (error) {
            console.error("Error marking notification as read:", error);
            toast.error("Failed to mark notification as read: " + (error.data?.message || error.message));
        }
    }
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
                                key={notif._id}
                                className="flex items-start gap-2 py-2 hover:bg-muted"
                                onClick={() => handleSingleNotificationClick(notif._id)}
                            >
                                <HiBellAlert className="mt-1 text-yellow-500" />
                                <div className='w-full'>
                                    <div className='flex flex-row justify-between items-center'>

                                        <p className='font-bold'>{notif.notiType.toUpperCase()}</p>
                                        <p>{getDaysAgo(new Date(notif.createdAt))}</p>
                                    </div>
                                    <span
                                        className="text-sm text-ellipsis  w-full line-clamp-1"
                                        title={notif.text}
                                    >
                                        {notif.text}
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

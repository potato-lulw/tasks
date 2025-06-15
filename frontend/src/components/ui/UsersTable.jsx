
import { getInitials } from '@/utils/utils';
import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetTeamQuery } from '@/redux/slices/api/userApiSlice';

// Helper to get days ago
const getDaysAgo = (dateString) => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffTime = now - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};

const UsersTable = () => {

    const {data, isLoading, error} = useGetTeamQuery();
    const [users, setUsers] = React.useState([]);
    useEffect(() => {
        if (data) {
            setUsers(data);
        } else if (error) {
            console.error("Error fetching users:", error);
        }
    }, [data, error]);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    users.map(user => (
                        <TableRow key={user._id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    {/* Avatar Circle */}
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium">
                                        {getInitials(user.name)}
                                    </div>
                                    {/* Name + Title */}
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-sm text-muted-foreground">{user.title}</span>
                                    </div>

                                </div>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 text-xs rounded-md ${user.isActive
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {user.isActive ? "Active" : "Inactive"}
                                </span>
                            </TableCell>
                            <TableCell>{getDaysAgo(user.createdAt)}</TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    );
};

export default UsersTable;

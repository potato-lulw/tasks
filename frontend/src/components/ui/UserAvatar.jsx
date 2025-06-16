import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CiLogout, CiUser } from "react-icons/ci";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './button';
import { useTheme } from '../ThemeContextProvider';
import { toast } from 'sonner';
import { logout, setCredentials } from '@/redux/slices/authSlice';
import { useLogoutMutation } from '@/redux/slices/api/authApiSlice';
import CustomDialog from './CustomDialog';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from './input';
import { useChangePasswordMutation, useUpdateUserMutation,  } from '@/redux/slices/api/userApiSlice';
import AddUserForm from './AddUserForm'; // assuming this is a form component for editing

const UserAvatar = () => {
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutMutation();
    const [changePassword, { error }] = useChangePasswordMutation();
    const [updateProfile] = useUpdateUserMutation();

    const [user, setUser] = useState(null);

    const methodsPassword = useForm();
    const methodsEdit = useForm();

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('userInfo'));
        if (stored) {
            setUser(stored);
            methodsEdit.reset(stored); // prefill edit form
        }
        
    }, []);

    const logOut = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            toast.success("Logout successful!");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed: " + (error.data?.message || error.message));
        }
    };

    const handleChangePassword = async ({ oldPassword, newPassword }) => {
        try {
            await changePassword({ oldPassword, newPassword }).unwrap();
            toast.success("Password changed successfully!");
            methodsPassword.reset();
        } catch (error) {
            toast.error("Failed to change password: " + (error.data?.message || error.message));
        }
    };

    const handleEditSelf = async (data) => {
        console.log("Editing profile with data:", data);
        try {
            const result = await updateProfile({ ...data, _id: user._id }).unwrap();
            dispatch(setCredentials({...data, _id: user._id})); // Update user in auth slice
            toast.success("Profile updated successfully!");
            setUser(result); // Update local state
        } catch (error) {
            toast.error("Failed to update profile: " + (error.data?.message || error.message));
        }
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                    <CiUser size={24} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <div className="flex flex-col gap-2 p-2">
                        {/* Edit Profile */}
                        {user && (
                            <FormProvider {...methodsEdit}>
                                <CustomDialog
                                    triggerLabel="Edit Profile"
                                    triggerIcon=""
                                    title="Edit Profile"
                                    description="Update your account information."
                                    onSubmit={methodsEdit.handleSubmit(handleEditSelf)}
                                    submitLabel="Save Changes"
                                    customCss=""
                                >
                                    <AddUserForm data={user} />
                                </CustomDialog>
                            </FormProvider>
                        )}

                        {/* Change Password */}
                        <FormProvider {...methodsPassword}>
                            <CustomDialog
                                title="Change Password"
                                triggerLabel="Change Password"
                                submitLabel="Change Password"
                                onSubmit={methodsPassword.handleSubmit(handleChangePassword)}
                            >
                                <div className="flex flex-col gap-4 p-2">

                                    {/* Old Password */}
                                    <div>
                                        <p>Old Password</p>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type={showOld ? "text" : "password"}
                                                {...methodsPassword.register("oldPassword", { required: "Old password is required" })}
                                                className="w-full"
                                            />
                                            <button type="button" onClick={() => setShowOld(!showOld)}>
                                                {showOld ? "🙈" : "👁️"}
                                            </button>
                                        </div>
                                        {methodsPassword.formState.errors.oldPassword && (
                                            <p className="text-sm text-red-600">
                                                {methodsPassword.formState.errors.oldPassword.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* New Password */}
                                    <div>
                                        <p>New Password</p>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type={showNew ? "text" : "password"}
                                                {...methodsPassword.register("newPassword", { required: "New password is required" })}
                                                className="w-full"
                                            />
                                            <button type="button" onClick={() => setShowNew(!showNew)}>
                                                {showNew ? "🙈" : "👁️"}
                                            </button>
                                        </div>
                                        {methodsPassword.formState.errors.newPassword && (
                                            <p className="text-sm text-red-600">
                                                {methodsPassword.formState.errors.newPassword.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <p>Confirm New Password</p>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type={showConfirm ? "text" : "password"}
                                                {...methodsPassword.register("confirmPassword", {
                                                    required: "Please confirm your new password",
                                                    validate: (val) =>
                                                        val === methodsPassword.getValues("newPassword") || "Passwords do not match",
                                                })}
                                                className="w-full"
                                            />
                                            <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                                                {showConfirm ? "🙈" : "👁️"}
                                            </button>
                                        </div>
                                        {methodsPassword.formState.errors.confirmPassword && (
                                            <p className="text-sm text-red-600">
                                                {methodsPassword.formState.errors.confirmPassword.message}
                                            </p>
                                        )}
                                        {error && (
                                            <p className="text-sm text-red-600">
                                                {error.data?.message || error.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CustomDialog>
                        </FormProvider>
                    </div>

                    <DropdownMenuItem>
                        <Button variant="destructive" className="w-full flex items-center justify-center gap-2" onClick={logOut}>
                            <CiLogout size={24} color="#fff" />
                            Log Out
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserAvatar;

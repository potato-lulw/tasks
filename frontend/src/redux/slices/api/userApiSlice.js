import { apiSlice } from "../apiSlice";

const USER_URL = "/users";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (credentials) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: credentials,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
        userAction: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `${USER_URL}/${id}`,
                method: "PUT",
                body: { isActive }, // ✅ send the isActive value in body
                credentials: "include",
                headers: {
                    "Content-Type": "application/json", // ✅ just to be safe
                },
            }),
            invalidatesTags: ["User"],
        }),

        getTeam: builder.query({
            query: () => ({
                url: `${USER_URL}/get-team`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["User"],
        }),
        changePassword: builder.mutation({
            query: (credentials) => ({
                url: `${USER_URL}/change-password`,
                method: "PUT",
                body: credentials,
                credentials: "include",
            })
        }),
        getNotifications: builder.query({
            query: () => ({
                url: `${USER_URL}/Notifications`,
                method: "GET",
                credentials: "include",
            })
        }),
        readNotification: builder.mutation({
            query: ({ id, isReadType = "single" }) => ({
                url: `${USER_URL}/read-noti`,
                method: "PUT",
                body: { id, isReadType }, // send both
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),




    })
})

export const { useUpdateUserMutation, useGetTeamQuery, useDeleteUserMutation, useUserActionMutation, useChangePasswordMutation, useGetNotificationsQuery, useReadNotificationMutation } = userApiSlice
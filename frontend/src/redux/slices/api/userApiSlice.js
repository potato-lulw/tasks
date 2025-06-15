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


    })
})

export const { useUpdateUserMutation, useGetTeamQuery, useDeleteUserMutation, useUserActionMutation } = userApiSlice
import { apiSlice } from "../apiSlice";

const AUTH_URL = "/users";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: credentials,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: credentials,
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: "POST",
                credentials: "include",
            }),
            invalidatesTags: ["User"],
        }),
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice
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
        })
    })
})

export const { useLoginMutation } = authApiSlice
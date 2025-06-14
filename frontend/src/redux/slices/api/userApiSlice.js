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

export const { useUpdateUserMutation, useGetTeamQuery } = userApiSlice
import { apiSlice } from "../apiSlice";
const TASK_URL = '/tasks';

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => (
        {
            createTask: builder.mutation({
                query: (credentials) => ({
                    url: `${TASK_URL}/create`,
                    method: "POST",
                    body: credentials,
                    credentials: "include",
                }),
                invalidatesTags: ["Task"],
            }),
            getTasks: builder.query({
                query: () => ({
                    url: `${TASK_URL}`,
                    method: "GET",
                    credentials: "include",
                }),
                providesTags: ["Task"],
            }),
            getDashboardStats: builder.query({
                query: () => ({
                    url: `${TASK_URL}/dashboard`,
                    method: "GET",
                    credentials: "include",
                }),
                providesTags: ["Task"],
            }),
        }
    )
})

export const { useCreateTaskMutation, useGetTasksQuery, useGetDashboardStatsQuery } = taskApiSlice;

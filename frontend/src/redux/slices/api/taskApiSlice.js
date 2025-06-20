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
                query: ({ stage, isTrashed }) => {
                    const params = new URLSearchParams();
                    if (stage) params.append("stage", stage);
                    if (isTrashed) params.append("isTrashed", isTrashed);

                    return {
                        url: `${TASK_URL}?${params.toString()}`,
                        method: "GET",
                        credentials: "include",
                    };
                },
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
            editTask: builder.mutation({
                query: ({ id, ...credentials }) => ({
                    url: `${TASK_URL}/update/${id}`,
                    method: "PUT",
                    body: credentials,
                    credentials: "include",
                }),
                invalidatesTags: ["Task"],
            }),
        }
    )
})

export const { useCreateTaskMutation, useGetTasksQuery, useGetDashboardStatsQuery, useEditTaskMutation } = taskApiSlice;

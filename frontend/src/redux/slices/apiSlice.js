import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = import.meta.env.VITE_API_URL + '/api'


const baseQuery = fetchBaseQuery({baseUrl: API_URI});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: [],
    endpoints:  (builder) => ({}),
})

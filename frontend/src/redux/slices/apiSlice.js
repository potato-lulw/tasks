import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = import.meta.env.VITE_API_URL + '/api'
// const API_URI = 'http://localhost:8800/api'
console.log("API URI:", API_URI);

const baseQuery = fetchBaseQuery({baseUrl: API_URI});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: [],
    endpoints:  (builder) => ({}),
})

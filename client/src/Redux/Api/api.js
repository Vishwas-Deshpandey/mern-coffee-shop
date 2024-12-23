import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../Config/apiConfig'


const baseQuery = fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1` });

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Auth', 'Restaurant', 'Category', 'MenuIngrediants','Menu'],
    endpoints: (builder) => ({})
})

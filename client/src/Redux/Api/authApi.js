import { api } from "./api";

export const userApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: (token) => ({
                url: '/auth',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            providesTags: ['Auth']
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Auth']
        })

    })
})


export const { useGetMyProfileQuery, useRegisterMutation, useLoginMutation } = userApiSlice;
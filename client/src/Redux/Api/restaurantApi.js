import { api } from "./api";


const restaurantApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getMyRestaurant: builder.query({
            query: (token) => ({
                url:'/restaurant',
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            }),
            providesTags:['Restaurant']
        }),
        addRestaurant: builder.mutation({
            query: (data) => ({
                url: '/restaurant/add',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${data.token}`
                },
                body: data.restaurantData
            }),
            invalidatesTags: ['Restaurant']
        }),
        changeRestaurantStatus: builder.mutation({
            query: (data) => ({
                url: `/restaurant/change-status/${data.restaurantId}`,
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            }),
            invalidatesTags: ['Restaurant']
        })
    })
})


export const { useGetMyRestaurantQuery,useAddRestaurantMutation,useChangeRestaurantStatusMutation } = restaurantApiSlice
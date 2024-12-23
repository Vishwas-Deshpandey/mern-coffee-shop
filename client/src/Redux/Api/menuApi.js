import { api } from "./api";

const menuApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllRestaurantCategory: builder.query({
            query: (data) => ({
                url: `/category/all/${data.restaurantId}`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            }),
            providesTags: ['Category']
        }),
        getAllMenuIngrediants: builder.query({
            query: (data) => ({
                url: `/menuIngrediants/all/${data.restaurantId}`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            }),
            providesTags: ['MenuIngrediants']
        }),
        createNewMenu: builder.mutation({
            query: (data) => ({
                url: '/menu/create',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${data.token}`
                },
                body: data.formData
            }),
            invalidatesTags: ['Menu']
        })
    })
})


export const { useGetAllRestaurantCategoryQuery, useGetAllMenuIngrediantsQuery, useCreateNewMenuMutation } = menuApiSlice
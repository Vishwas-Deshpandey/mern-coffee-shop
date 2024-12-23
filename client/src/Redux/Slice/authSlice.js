import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isRestaurantRegisterd: null,
    loader: false,
    restaurantId: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        setLogout: (state, action) => {
            state.user = null;
            localStorage.removeItem('user')
        },
        setReastaurantRegisterd: (state, action) => {
            state.isRestaurantRegisterd = action.payload
        },
        setRestaurantId: (state, action) => {
            state.restaurantId = action.payload;
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        }
    }
})

export const { setCredentials, setLogout, setReastaurantRegisterd, setRestaurantId, setLoader } = authSlice.actions;
export default authSlice.reducer;
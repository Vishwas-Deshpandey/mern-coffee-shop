import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useGetMyRestaurantQuery } from '../../Redux/Api/restaurantApi';
import { setLoader, setReastaurantRegisterd, setRestaurantId } from '../../Redux/Slice/authSlice';
import Loader from '../Loader';

const RestaurantPrivateRoute = ({ auth, redirectUrl = "/login" }) => {
    const token = auth?.token;

    const { loader, isRestaurantRegisterd } = useSelector((store) => store.auth);

    const { data: restaurant, isLoading } = useGetMyRestaurantQuery(token, { skip: auth?.role !== 'RESTAURANT_OWNER' })

    const location = useLocation();


    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading) {
            dispatch(setLoader(true))
            const restaurantStatus = restaurant?.myRestaurant ? true : false
            dispatch(setReastaurantRegisterd(restaurantStatus))
            dispatch(setRestaurantId(restaurantStatus ? restaurant?.myRestaurant._id : '')) // added @14-dec-2024
            dispatch(setLoader(false))
        }
    }, [isLoading, restaurant, dispatch])


    // this code will run when the user is registered himself but not registerd the restaurant it will redirect him to /restaurant and if both the user and restaurant registerd it will not run code @ 7-dec-2024
    if (!isLoading && isRestaurantRegisterd !== null) {
        if (location.pathname !== '/restaurant' && isRestaurantRegisterd === false) {
            return <Navigate to="/restaurant" replace />
        }
    }




    if (auth?.role !== 'RESTAURANT_OWNER') {
        return <Navigate to={redirectUrl} replace />
    }


    if (isLoading) {
        return <Loader />; // Show a loader while data is being fetched
    }



    return (
        <Outlet />
    )
}

export default RestaurantPrivateRoute
import React from 'react'
import { Outlet } from 'react-router-dom'
import RestaurantLayout from '../../Components/Restaurant/RestaurantLayout'
import RestaurantMenu from '../../Components/Restaurant/RestaurantMenu'

const Restaurant = () => {
    return (
        <RestaurantLayout>
            <div className="container-fluid ps-0">
                <div className="row">
                    <div className="col-2">
                        <RestaurantMenu />
                    </div>
                    <div className="col-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </RestaurantLayout>
    )
}

export default Restaurant
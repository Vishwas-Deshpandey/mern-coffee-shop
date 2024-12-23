import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const UserPrivateRoute = ({ children, auth, redirectUrl = "/login" }) => {
  
    if (auth?.role !== 'CUSTOMER') {
        return <Navigate to={redirectUrl} replace />
    }

    return (
        <>
            {
                children ? children : <Outlet />
            }
        </>
    )
}

export default UserPrivateRoute
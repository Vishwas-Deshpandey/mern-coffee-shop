import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ auth, redirectUrl = "/login" }) => {
    if (!auth) {
        return <Navigate to={redirectUrl} />
    }
    return (
        <Outlet />
    )
}

export default PrivateRoute
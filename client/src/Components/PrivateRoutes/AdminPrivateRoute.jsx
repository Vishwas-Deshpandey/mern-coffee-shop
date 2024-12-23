import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminPrivateRoute = ({ auth, redirectUrl = "/login" }) => {
    if (auth?.role !== 'ADMIN') {
        return <Navigate to={redirectUrl} />
    }
    return (
        <Outlet />
    )
}

export default AdminPrivateRoute
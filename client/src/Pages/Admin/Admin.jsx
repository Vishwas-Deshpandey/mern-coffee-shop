import React from 'react'
import Header from '../../Components/Admin/Header'
import AdminMenu from '../../Components/Admin/AdminMenu'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Customer/Footer'
import AdminLayout from '../../Components/Admin/AdminLayout'

const Admin = () => {
    return (
        <AdminLayout>
            <div className="container-fluid ps-0">
                <div className="row">
                    <div className="col-2">
                        <AdminMenu />
                    </div>
                    <div className="col-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Admin
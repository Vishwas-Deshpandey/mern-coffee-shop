import React from 'react'
import Layout from '../../Components/Customer/Layout'
import UserMenu from '../../Components/Customer/UserMenu'
import { Outlet } from 'react-router-dom'

const User = () => {
    return (
        <Layout>
            <div className='container-fluid ps-0'>
                <div className="row">
                    <div className="col-2">
                        <UserMenu />
                    </div>
                    <div className="col-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default User
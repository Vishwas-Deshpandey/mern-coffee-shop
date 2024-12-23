import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div className='bg-dark text-white p-2' style={{minHeight:"85vh", height:"100%"}}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-2">
                <li className="nav-item">
                    <NavLink to="/user" className="nav-link active" aria-current="page">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/user/profile" className="nav-link">User Profile</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/user" className="nav-link">My Orders</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/user" className="nav-link">My Addresses</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/user" className="nav-link">Favroite Menu's</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/user" className="nav-link">Favroite Restaurants</NavLink>
                </li>
            
            </ul>
        </div>
    )
}

export default UserMenu
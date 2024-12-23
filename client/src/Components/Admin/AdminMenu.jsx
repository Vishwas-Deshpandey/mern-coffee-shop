import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { setLogout } from '../../Redux/Slice/authSlice';

const AdminMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/login')
    }
    return (
        <div className='bg-dark text-white p-2' style={{ minHeight: "85vh", height: "100%" }}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-2">
                <li className="nav-item">
                    <NavLink to="/admin" className="nav-link active" aria-current="page">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/profile" className="nav-link active" aria-current="page">Update Profile</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin" className="nav-link active" aria-current="page">All Restaurants</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin" className="nav-link active" aria-current="page">All Customers</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin" className="nav-link active" aria-current="page">Manage Orders</NavLink>
                </li>

                <li className="nav-item mt-4">
                    <button className="btn btn-outline-danger w-100" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default AdminMenu
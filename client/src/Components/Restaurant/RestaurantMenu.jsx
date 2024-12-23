import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { setLogout, setReastaurantRegisterd } from '../../Redux/Slice/authSlice';

const RestaurantMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch(setLogout());
        dispatch(setReastaurantRegisterd(false))
        navigate('/login')
    }
    return (
        <div className='bg-dark text-white p-2' style={{ minHeight: "88vh", height: "100%" }}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-2">
                <li className="nav-item">
                    <NavLink to="/restaurant" className="nav-link active" aria-current="page">Dashboard</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/restaurant/update" className="nav-link active" aria-current="page">Update Restaurant</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/restaurant/profile" className="nav-link active" aria-current="page">Update Profile</NavLink>
                </li>


                <li className="nav-item">
                    <NavLink to="/restaurant/add/menu" className="nav-link active" aria-current="page">Add Menu</NavLink>
                </li>

                
                <li className="nav-item">
                    <NavLink to="/restaurant/category" className="nav-link active" aria-current="page">Manage Categories</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/restaurant/menu/ingrediants" className="nav-link active" aria-current="page">Menu Ingrediants</NavLink>
                </li>




                <li className="nav-item mt-4">
                    <button className="btn btn-outline-danger w-100" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default RestaurantMenu
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import userLogo from '/vite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../Redux/Slice/authSlice';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    switch (user?.role) {
      case 'CUSTOMER':
        navigate('/user')
        break;

      case 'RESTAURANT_OWNER':
        navigate('/restaurant')
        break;

      case 'ADMIN':
        navigate('/admin')
        break;

    }
  }


  const handleLogout = () => {
    dispatch(setLogout());

    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">☕ Coffee Shop</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link active" aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Restaurents</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Menu's</NavLink>
            </li>

          </ul>
          <div className="d-flex align-items-center gap-4 justify-content-center">
            {
              user && user?.token ? (
                <>
                  <img src={userLogo} alt="user" width={"28px"} height={"28px"} style={{ cursor: "pointer" }} onClick={handleNavigation} />
                  <button className='btn btn-sm btn-danger' onClick={handleLogout}>logout</button>
                </>
              ) : (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                  </li>
                </ul>
              )
            }
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Header
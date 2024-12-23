import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/Customer/HomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import User from './Pages/Customer/User'
import UserDashboard from './Components/Customer/UserDashboard'
import UserProfile from './Components/Customer/UserProfile'
import AddRestaurant from './Pages/AddRestaurant'
import Admin from './Pages/Admin/Admin'
import Restaurant from './Pages/Restaurant/Restaurant'
import RestaurantDashboard from './Components/Restaurant/RestaurantDashboard'
import UpdateRestaurant from './Components/Restaurant/UpdateRestaurant'
import AdminDashboard from './Components/Admin/AdminDashboard'
import { useDispatch, useSelector } from 'react-redux'
import { useGetMyRestaurantQuery } from './Redux/Api/restaurantApi'
import { useEffect, useState } from 'react'
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute'
import UserPrivateRoute from './Components/PrivateRoutes/UserPrivateRoute'
import RestaurantPrivateRoute from './Components/PrivateRoutes/RestaurantPrivateRoute'
import AdminPrivateRoute from './Components/PrivateRoutes/AdminPrivateRoute'
import { setReastaurantRegisterd } from './Redux/Slice/authSlice'
import Loader from './Components/Loader'
import AddMenu from './Components/Restaurant/AddMenu'
import Category from './Pages/Restaurant/Category'
import MenuIngrediantsPage from './Pages/Restaurant/MenuIngrediantsPage'
function App() {

  const { user, isRestaurantRegisterd, loader } = useSelector((state) => state.auth);

  const role = user?.role;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route element={<PrivateRoute auth={!user} redirectUrl={
            role === 'CUSTOMER' ? '/user'
              : role === 'RESTAURANT_OWNER' ? '/restaurant'
                : role === 'ADMIN' ? '/admin'
                  : '/login'
          } />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>

          <Route element={<UserPrivateRoute auth={user} />}>
            <Route path='/user' element={<User />}>
              <Route index path='' element={<UserDashboard />} />
              <Route path='profile' element={<UserProfile />} />
            </Route>
          </Route>

          <Route element={<RestaurantPrivateRoute auth={user} />}>
            <Route path='/restaurant' element={isRestaurantRegisterd === null ? <Loader /> : (isRestaurantRegisterd ? <Restaurant /> : <AddRestaurant />)}>
              <Route index path='' element={<RestaurantDashboard />} />
              <Route path='profile' element={<UserProfile />} />
              <Route path='update' element={<UpdateRestaurant />} />
              <Route path='add/menu' element={<AddMenu />} />
              <Route path='menu/ingrediants' element={<MenuIngrediantsPage />} />
              <Route path='category' element={<Category />} />
            </Route>
          </Route>

          <Route element={<AdminPrivateRoute auth={user} />}>
            <Route path='/admin' element={<Admin />}>
              <Route index path='' element={<AdminDashboard />} />
              <Route path='profile' element={<UserProfile />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import HomePage from './Pages/Customer/HomePage'
// import LoginPage from './Pages/LoginPage'
// import RegisterPage from './Pages/RegisterPage'
// import User from './Pages/Customer/User'
// import UserDashboard from './Components/Customer/UserDashboard'
// import UserProfile from './Components/Customer/UserProfile'
// import AddRestaurant from './Pages/AddRestaurant'
// import Admin from './Pages/Admin/Admin'
// import Restaurant from './Pages/Restaurant/Restaurant'
// import RestaurantDashboard from './Components/Restaurant/RestaurantDashboard'
// import UpdateRestaurant from './Components/Restaurant/UpdateRestaurant'
// import AdminDashboard from './Components/Admin/AdminDashboard'
// function App() {

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<HomePage />} />
//           <Route path='/login' element={<LoginPage />} />
//           <Route path='/register' element={<RegisterPage />} />
//           <Route path='/restaurant/add' element={<AddRestaurant />} />
//           {/* customer routes */}
//           <Route path='/user' element={<User />}>
//             <Route index path='' element={<UserDashboard />} />
//             <Route path='profile' element={<UserProfile />} />
//           </Route>
//           {/* restaurant routes */}
//           <Route path='/restaurant' element={<Restaurant />}>
//             <Route index path='' element={<RestaurantDashboard />} />
//             <Route path='profile' element={<UserProfile />} />
//             <Route path='update' element={<UpdateRestaurant />} />
//           </Route>
//           {/* admin routes */}
//           <Route path='/admin' element={<Admin />}>
//             <Route index path='' element={<AdminDashboard />} />
//             <Route path='profile' element={<UserProfile />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App


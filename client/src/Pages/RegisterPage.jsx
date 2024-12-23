import React, { useState } from 'react'
import Layout from '../Components/Customer/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../Redux/Api/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, setLoader } from '../Redux/Slice/authSlice'

const RegisterPage = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [role, setRole] = useState("CUSTOMER")

    const { loader } = useSelector((store) => store.auth)

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [register] = useRegisterMutation()

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoader(true))
            const response = await register({ name, email, password, mobile, role }).unwrap();

            if (response) {
                const user = {
                    _id: response?.user?.userId,
                    name: response?.user?.name,
                    role: response?.user?.role,
                    token: response?.token,
                }

                dispatch(setCredentials(user));

                // navigate the user based on the role
                if (response?.user?.role === 'CUSTOMER') {
                    navigate('/user')
                }

                if (response?.user?.role === 'RESTAURANT_OWNER') {
                    navigate('/restaurant')
                }
            }

            dispatch(setLoader(false))
        } catch (error) {
            dispatch(setLoader(false))

            console.log(error)
        }
    }
    return (
        <Layout>

            <div style={{ height: "88vh" }} className='d-flex align-items-center justify-content-center flex-column gap-2 m-4'>
                <form style={{ minWidth: "40%", }} onSubmit={handleFormSubmission}>
                    <h5 className='pb-1'>Welcome User</h5>

                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Your Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" required autoComplete='off' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required autoComplete='off' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required autoComplete='off' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputMobile1" className="form-label">Your Mobile</label>
                        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" id="exampleInputMobile1" aria-describedby="mobileHelp" required autoComplete='off' />
                    </div>


                    <div className='mb-3'>

                        <label htmlFor="exampleInputSelect" className="form-label">Register As</label>

                        <select className="form-select" id='exampleInputSelect' value={role} onChange={(e) => setRole(e.target.value)} aria-label="Default select example">
                            <option value={"CUSTOMER"}>Customer</option>
                            <option value={"RESTAURANT_OWNER"}>Restaurant Owner</option>
                        </select>
                    </div>

                    {
                        role === 'RESTAURANT_OWNER' && (
                            <div className="mb-3">
                                <small className="text-danger">
                                    *Please Note That the email above provided can't be use for Normal User Account in future
                                </small>
                            </div>
                        )
                    }

                    <div className="mb-3">
                        Already have an account <Link to="/login">login</Link>
                    </div>
                    <button type="submit" className="btn btn-dark w-100" disabled={loader}>
                        {loader && (
                            <div className="spinner-border spinner-border-sm me-4" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                        register
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default RegisterPage
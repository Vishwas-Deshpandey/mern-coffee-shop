import React, { useState } from 'react'
import Layout from '../Components/Customer/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../Redux/Api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setLoader } from '../Redux/Slice/authSlice';

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const { loader } = useSelector((state) => state.auth)

    const [login] = useLoginMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoader(true))
            const response = await login({ email, password }).unwrap();

            if (response) {
                const user = {
                    _id: response?.user?.userId,
                    name: response?.user?.name,
                    role: response?.user?.role,
                    token: response?.token
                }

                dispatch(setCredentials(user));

                if (response?.user?.role === 'CUSTOMER') {
                    navigate('/user')
                }

                if (response?.user?.role === 'RESTAURANT_OWNER') {
                    navigate('/restaurant')
                }

                if (response?.user?.role === 'ADMIN') {
                    navigate('/admin')
                }
            }
            dispatch(setLoader(false))

        } catch (error) {
            dispatch(setLoader(false))
            setEmail('');
            setPassword('')
            console.log(error);

        }
    }
    return (
        <Layout>

            <div style={{ height: "75vh" }} className='d-flex align-items-center justify-content-center flex-column gap-2'>
                <form style={{ minWidth: "28%" }} onSubmit={handleFormSubmission}>
                    <h5 className='pb-4'>Welcome Back, User</h5>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required autoComplete='off' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" required autoComplete='off' />
                    </div>
                    <div className="mb-3">
                        Don't have an account <Link to="/register">register</Link>
                    </div>
                    <button type="submit" className="btn btn-dark w-100" disabled={loader}>
                        {loader && (<div className="spinner-border spinner-border-sm me-4" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        )}
                        login
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default LoginPage
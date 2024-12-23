import React, { useState } from 'react'
import Layout from '../Components/Customer/Layout'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAddRestaurantMutation } from '../Redux/Api/restaurantApi';
import { setLoader } from '../Redux/Slice/authSlice';

const AddRestaurant = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addNewRestaurant] = useAddRestaurantMutation();
    const { user, loader } = useSelector((state) => state.auth);
    const token = user?.token;

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        const data = {
            token,
            restaurantData: {
                name,
                email,
                mobile,
                city,
                state,
                zip,
                address
            }
        }
        try {
            dispatch(setLoader(true))
            const response = await addNewRestaurant(data).unwrap();

            if (response) {
                navigate('/restaurant')
            }
            dispatch(setLoader(false))
        } catch (error) {
            console.log(error);
            dispatch(setLoader(false))
        }
    }


    return (
        <Layout>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className='my-2'>Hurray !! You are One Step Closer</h5>
                        <p className='me-4 mt-4'>Lets Start Beginning to Complete the other task which is pending is to register your restaurant</p>
                        <div className='mt-4'>
                            <p>✔ Registerd SuccessFully </p>
                            <p>⭕ Register Your Restaurant</p>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <h4>Register Your Restaurant</h4>
                        <hr />

                        <div className="container-fluid">
                            <form onSubmit={handleFormSubmission}>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Your Restaurant Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" aria-describedby="nameHelp" autoComplete='off' required />
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label">Your Restaurant Email</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" autoComplete='off' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="mobile" className="form-label">Your Restaurant Contact Detail</label>
                                        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" id="mobile" aria-describedby="mobileHelp" autoComplete='off' required />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" id="city" aria-describedby="city" autoComplete='off' required />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="form-control" id="state" aria-describedby="state" autoComplete='off' required />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="zip" className="form-label">Zip</label>
                                        <input type="number" value={zip} onChange={(e) => setZip(e.target.value)} className="form-control" id="zip" aria-describedby="zip" autoComplete='off' required />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Restaurant Address</label>
                                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows={4} />
                                </div>

                                <div className="mb-3">
                                    <button className="btn btn-dark w-100" disabled={loader}>
                                        {
                                            loader && (<div className="spinner-border spinner-border-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            )
                                        }
                                        Add Restaurant
                                    </button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AddRestaurant
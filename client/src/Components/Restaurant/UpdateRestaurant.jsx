import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useGetMyRestaurantQuery } from '../../Redux/Api/restaurantApi';


const UpdateRestaurant = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('');
    const [streetAddress, setStreetAddress] = useState('');


    const handleFormSubmission = (e) => {
        e.preventDefault();
    }

    const {user} = useSelector((state) => state.auth)
    const token = user?.token;

    const {data, isLoading} = useGetMyRestaurantQuery(token, {skip:!token})

    useEffect(() => {
        if(!isLoading){
            setName(data?.myRestaurant?.name)
            setEmail(data?.myRestaurant?.email)
            setMobile(data?.myRestaurant?.mobile)
            setCity(data?.myRestaurant?.city)
            setState(data?.myRestaurant?.state)
            setZip(data?.myRestaurant?.zip)
            setStreetAddress(data?.myRestaurant?.address)
        }
    }, [isLoading, data])

    return (

        <div className="container mt-4">


            <h4>Update Your Restaurant</h4>
            <hr />

            <div className="container-fluid">
                <form onSubmit={handleFormSubmission}>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Your Restaurant Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" aria-describedby="nameHelp" autoComplete='off' required />
                    </div>

                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="email" className="form-label">Your Restaurant Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" autoComplete='off' required />
                        </div>
                        <div className="col-6">
                            <label htmlFor="mobile" className="form-label">Your Restaurant Contact Detail</label>
                            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" id="mobile" aria-describedby="mobileHelp" autoComplete='off' required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" id="city" aria-describedby="city" autoComplete='off' required />
                        </div>
                        <div className="col-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="form-control" id="state" aria-describedby="state" autoComplete='off' required />
                        </div>
                        <div className="col-4">
                            <label htmlFor="zip" className="form-label">Zip</label>
                            <input type="number" value={zip} onChange={(e) => setZip(e.target.value)} className="form-control" id="zip" aria-describedby="zip" autoComplete='off' required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Restaurant Address</label>
                        <textarea value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows={4} />
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-dark w-100">Update Restaurant</button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default UpdateRestaurant
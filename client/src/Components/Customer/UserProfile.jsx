import React, { useEffect, useState } from 'react'
import { useGetMyProfileQuery } from '../../Redux/Api/authApi';
import { useSelector } from 'react-redux';

const UserProfile = () => {


    
  const [name, setName] = useState("Vishwas Deshpandey")
  const [email, setEmail] = useState("vishwas@test.com");
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("832938293")

    const handleFormSubmission = (e) => {
        e.preventDefault();
        alert(`Form Submitted: ${name} ${email} and ${password} and ${mobile}`)
    }

    const {user} = useSelector((state) => state.auth)
    const token = user?.token

    const {data, isLoading} = useGetMyProfileQuery(token, {skip:!token});

    useEffect(() => {
        if(!isLoading){
            setName(data?.user?.name);
            setEmail(data?.user?.email);
            setMobile(data?.user?.mobile);
        }
    }, [isLoading, data])

    
    return (
        <div className='container'>
            <div className='my-4'>
                <h4>Welcom {user?.name}</h4>
                <hr />
            </div>

                <form className='w-50' onSubmit={handleFormSubmission}>

                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Enter Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} className="form-control"
                            id="exampleInputName"
                            aria-describedby="nameHelp"
                            autoComplete='off'
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            autoComplete='off'
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            autoComplete='off'
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputMobile" className="form-label">Mobile </label>
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)} className="form-control"
                            id="exampleInputMobile"
                            aria-describedby="phoneHelp"
                            autoComplete='off'
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100">update profile</button>
                </form>
            </div>
    )
}

export default UserProfile
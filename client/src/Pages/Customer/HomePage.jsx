import React from 'react'
import Layout from '../../Components/Customer/Layout'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    
    return (
        <Layout>
            <div className='d-flex align-items-center justify-content-center flex-column gap-2' style={{height:"65vh"}}>
                <h1>WELCOME TO <span className='text-danger'>COFEE</span> COMPANY</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>Find The Best Cofee For You From 150 registered restaurants</p>

                <div className='d-flex align-items-center gap-2'>
                <button className="btn btn-outline-dark">find a coffee</button>
                    <button onClick={() => navigate('/register')} className='btn btn-dark'>Join Us</button>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage
import React from 'react'

const Loader = ({color="text-primary"}) => {
    return (
         <div className="d-flex align-items-center justify-content-center" style={{height:"100vh", width:"100%"}}>
            <div className={`spinner-border ${color}`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
       

    )
}

export default Loader
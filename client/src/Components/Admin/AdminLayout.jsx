import React from 'react'
import Header from './Header'
import Footer from '../Customer/Footer'

const AdminLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ minHeight: "85vh" }}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default AdminLayout
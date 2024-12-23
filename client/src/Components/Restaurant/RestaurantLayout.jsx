import React from 'react'
import Header from './Header'
import Footer from '../Customer/Footer'

const RestaurantLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main style={{ minHeight: '88vh' }}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default RestaurantLayout
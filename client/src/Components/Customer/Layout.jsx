import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{minHeight:"85vh"}}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
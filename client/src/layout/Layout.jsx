import React from 'react'
import Navbar from "../components/Navbar";

function Layout({ children }) {
  return (
    <>
      <main className='container mx-auto px-5 '>
        <Navbar />
        {children}
      </main>
    </>
  )
}

export default Layout
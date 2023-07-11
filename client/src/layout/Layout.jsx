import React from 'react'
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-10 mt-28">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
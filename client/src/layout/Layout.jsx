import Navbar from "../components/Navbar";
import PropTypes from "prop-types";



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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
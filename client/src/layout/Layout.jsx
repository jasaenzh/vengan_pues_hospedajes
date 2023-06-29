import Navbar from "../components/Navbar";
import PropTypes from "prop-types";



function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
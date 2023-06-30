import { useAuth } from "../context/AuthContext"

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

function Home() {

  const { user, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user.emailVerified === false) {
      navigate("/validar-email")
    } else if (isAuthenticated && user.emailVerified === true) {
      navigate("/")
    }
  }, [user, isAuthenticated, navigate])


  return (
    <div>Home</div>
  )
}

export default Home
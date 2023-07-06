import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import ValidateEmail from "./pages/ValidateEmail"

// import { useEffect } from "react";
// import { useAuth } from "./context/AuthContext"
import ProtectedRoute from "./ProtectedRoute"
import ProtectedRouteAdmin from "./ProtectedRouteAdmin"
import AdminApartment from "./pages/AdminApartment"
// import Cookies from 'js-cookie'

function App() {

  // const { user, isAuthenticated } = useAuth();

  // useEffect(() => {
  //   console.log("Contexto global Usuario", user)
  //   console.log("Esta autenticado?", isAuthenticated)

  // }, [user, isAuthenticated])

  return (

    <BrowserRouter>
      <Layout>
        <Routes>

          {/* Rutas Publicas */}
          <Route path="/" element={<Home />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/iniciar-sesion" element={<Login />} />

          {/* Rutas Privadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<Profile />} />
            <Route path="/validar-email" element={<ValidateEmail />} />
          </Route>

          {/* Rutas Privadas - Admin  */}
          <Route element={<ProtectedRouteAdmin />}>
            <Route path="/admin-apartamentos" element={<AdminApartment />} />
          </Route>

          {/* Ruta 404 - No Encontrada   */}
          <Route path="/*" element={<div>Not found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>


  )
}

export default App
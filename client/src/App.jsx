import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>

            {/* Rutas Publicas */}
            <Route path="/" element={<Home />} />
            <Route path="/registrarse" element={<Register />} />
            <Route path="/iniciar-sesion" element={<Login />} />

            {/* Rutas Privadas */}
            <Route path="/perfil" element={<Profile />} />

            {/* Ruta 404 - No Encontrada   */}
            <Route path="/*" element={<div>Not found</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
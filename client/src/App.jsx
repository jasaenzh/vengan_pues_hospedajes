import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout"
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./pages/Profile";
import ValidateEmail from "./pages/ValidateEmail"
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import AdminApartment from "./pages/AdminApartment"
import CreateApartment from "./pages/CreateApartment"
import LandingPage from './pages/LandingPage';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* Rutas Publicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/apartamentos" element={<Home />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/iniciar-sesion" element={<Login />} />

          {/* Rutas Privadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<Profile />} />
            <Route path="/apartamentos" element={<Home />} />
            <Route path="/validar-email" element={<ValidateEmail />} />
          </Route>

          {/* Rutas Privadas - Admin  */}
          <Route element={<ProtectedRouteAdmin />}>
            <Route path="/admin-apartamentos" element={<AdminApartment />} />
            <Route path="/admin-apartamentos/crear-apartamento" element={<CreateApartment />} />
            <Route path='admin-apartamentos/crear-apartamento/:id' element={<CreateApartment />} />'
          </Route>

          {/* Ruta 404 - No Encontrada   */}
          <Route path="/*" element={<div>Not found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

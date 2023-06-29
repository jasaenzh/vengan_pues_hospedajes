import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/*" element={<div>Not found</div>} />
        </Routes>
      </Layout>

    </BrowserRouter>
  )
}

export default App
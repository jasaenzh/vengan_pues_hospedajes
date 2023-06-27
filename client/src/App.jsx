import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/iniciar-sesion" element={<div>Login page</div>} />
        <Route path="/registrarse" element={<div>Register page</div>} />
        <Route path="/perfil" element={<div>Profile page</div>} />
        <Route path="/*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
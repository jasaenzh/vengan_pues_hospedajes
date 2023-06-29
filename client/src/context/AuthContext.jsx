/* eslint-disable react-refresh/only-export-components */

// Importo createContext para poder crear un contexto
import { createContext, useContext, useState, useEffect } from "react";
import { profileRequest, registerRequest } from "../api/auth.calls";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'


// Creo el contexto
export const AuthContext = createContext()


export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe estar dentro de un AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {


  // Creo el estado Usuario
  const [user, setUser] = useState(null);

  // Creo el estado autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Creo el estado de cargando
  const [loading, setLoading] = useState(true);

  // Creo el estado de errores
  const [errors, setErrors] = useState([]);


  /** Si hay un usuario logeado, seteamos la cookie  */
  useEffect(() => {
    async function checkLogin() {
      const cookie = Cookies.get();

      /** Comprueba si hay un token en la cookie */
      if (!cookie.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null)
      }


      /** Si hay un token, verifica que sea válido en el backend  */
      try {
        // Aca lo envio al backend para verificar que sea válido
        const response = await profileRequest(cookie.token)

        // Si no hay nada en la respuesta, es porque el token no es válido
        if (!response.data) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }

        // Si hay algo en la respuesta, es porque el token es válido, actualizo los estados
        setIsAuthenticated(true)
        setUser(response.data)
        setLoading(false)

      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }

    }
    checkLogin()
  }, [])


  /** Si hay errores, seteamos un timeout para que desaparezcan */
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000);
      return () => clearTimeout(timer)
    }
  }, [errors])


  // Contexto para el estado registra usuario
  const checkIn = async (user) => {
    try {
      const response = registerRequest(user);
      setUser(response.data)
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data)
    }
  }



  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      errors,
      loading,
      checkIn
    }}>
      {children}
    </AuthContext.Provider>
  )

}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
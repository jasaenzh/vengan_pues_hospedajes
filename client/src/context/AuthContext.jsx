/* eslint-disable react-hooks/exhaustive-deps */

// Importo createContext para poder crear un contexto
import { createContext, useContext, useState, useEffect } from "react";
import { profileRequest, registerRequest, verifyEmailRequest, loginRequest } from "../api/auth.calls";
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
  const [errorsAuth, setErrorsAuth] = useState([]);




  // Contexto para el estado registra usuario
  const checkIn = async (user) => {

    try {
      const response = await registerRequest(user)
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrorsAuth(error.response.data)
    }

  }

  // const checkIn = async (user) => {
  //   try {
  //     const response = await registerRequest(user);
  //     setUser(response.data);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       setErrorsAuth([error.response.data]);
  //     } else {
  //       setErrorsAuth(["Ocurrió un error durante el registro"]);
  //     }
  //   }
  // };

  // Contexto para el estado verificar email
  const verifyEmail = async (code) => {
    try {
      const response = await verifyEmailRequest(code);
      return response
    } catch (error) {
      setErrorsAuth(error.response.data);
    }
  }

  // Contexto para iniciar sesión
  const singIn = async (user) => {
    try {
      const response = await loginRequest(user);
      console.log("Respuesta SingIn", response);
      const token = response.data.token; // Asegúrate de obtener el token correctamente desde la respuesta
      localStorage.setItem("token", token); // Guarda el token en localStorage
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrorsAuth(error.response.data);
    }
  }

  // Contexto para cerrar sesión
  const singOut = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
    return;
  }


  /** Si hay un usuario logeado, seteamos la cookie  */
  useEffect(() => {
    async function checkLogin() {
      try {
        const token = localStorage.getItem("token");
        console.log("Token LocalStorage", token)

        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return setUser(null);
        }

        const response = await profileRequest(token);

        if (!response.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);


  // useEffect(() => {
  //   console.log("Paso por aquí UseEffect")
  //   async function checkLogin() {
  //     console.log("Paso por aquí checkLogin")
  //     const token = Cookies.get('token');
  //     console.log("Este es el Token", token)

  //     /** Comprueba si hay un token en la cookie */
  //     if (!token) {
  //       console.log("No hay token")
  //       setIsAuthenticated(false);
  //       setLoading(false);
  //       return setUser(null);
  //     }

  //     console.log("Esta a punto de ingresar al try")

  //     /** Si hay un token, verifica que sea válido en el backend  */
  //     try {
  //       // Envía el token al backend para verificar su validez
  //       const response = await profileRequest(token);

  //       console.log("response de ProfileRequest", response)

  //       // Si no hay nada en la respuesta, es porque el token no es válido
  //       if (!response.data) {
  //         console.log("No hay nada en la respuesta", response)
  //         setIsAuthenticated(false);
  //         setLoading(false);
  //         return;
  //       }

  //       // Si hay algo en la respuesta, es porque el token es válido, actualiza los estados
  //       setIsAuthenticated(true);
  //       setUser(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //       setUser(null);
  //       setLoading(false);
  //     }
  //   }
  //   checkLogin();
  // }, []);


  /** Si hay errores, seteamos un timeout para que desaparezcan */
  useEffect(() => {
    if (errorsAuth.length > 0) {
      const timer = setTimeout(() => {
        setErrorsAuth([])
      }, 5000);
      return () => clearTimeout(timer)
    }
  }, [errorsAuth])



  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      errorsAuth,
      loading,
      checkIn,
      verifyEmail,
      singIn,
      singOut
    }}>
      {children}
    </AuthContext.Provider>
  )

}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
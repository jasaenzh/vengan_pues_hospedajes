import { createContext, useContext, useEffect } from "react";
import { useState } from 'react';
import { createApartmentRequest, getApartmentsRequest } from "../api/apartment.calls";
import Cookies from 'js-cookie'

// Creo el contexto
export const ApartmentContext = createContext();

export const useApartmentContext = () => {
  const contextApartment = useContext(ApartmentContext);
  if (!contextApartment) throw new Error('useApartmentContext debe estar dentro de un AuthProvider');
  return (contextApartment);
}


export const ApartmentProvider = ({ children }) => {

  // Estado global
  const [apartments, setApartments] = useState([]);

  // Creo el estado de errores
  const [errorsApartment, setErrorsApartment] = useState([]);


  // Crear apartamento
  const createApartment = async (dataApartment, tokenHeader) => {
    try {
      const response = await createApartmentRequest(dataApartment)
      // const token = response.data.token
      Cookies.set('token', tokenHeader);
      return response
    } catch (error) {
      // setErrorsApartment(error.response.data);
      const errorMessage = Array.isArray(error.response.data) ? error.response.data : [error.response.data];
      setErrorsApartment(errorMessage);
      return error.response
    }
  }

  const getApartments = async () => {
    try {
      const response = await getApartmentsRequest()
      setApartments(response.data)
    } catch (error) {
      setErrorsApartment(error.response.data);
    }
  }

  /** Si hay errores, seteamos un timeout para que desaparezcan */
  useEffect(() => {
    if (errorsApartment.length > 0) {
      const timer = setTimeout(() => {
        setErrorsApartment([])
      }, 5000);
      return () => clearTimeout(timer)
    }
  }, [errorsApartment])

  return (
    <ApartmentContext.Provider value={{
      // Aca van las funciones y estados
      errorsApartment,
      apartments,
      createApartment,
      getApartments,
    }}>
      {children}
    </ApartmentContext.Provider>
  )
}
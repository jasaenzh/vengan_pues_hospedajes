import { createContext, useContext } from "react";
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
    console.log(tokenHeader)
    try {
      const response = await createApartmentRequest(dataApartment)
      // const token = response.data.token
      Cookies.set('token', tokenHeader);
      return response
    } catch (error) {
      console.log(error)
      // setErrorsApartment(error.response.data);
      console.log(error);
      const errorMessage = Array.isArray(error.response.data) ? error.response.data : [error.response.data];
      setErrorsApartment(errorMessage);
    }
  }
  // const createApartment = async (dataApartment) => {
  //   console.log(dataApartment)

  //   try {
  //     const response = await createApartmentRequest(dataApartment)
  //     return response
  //   } catch (error) {
  //     console.log(error)
  //     setErrorsApartment(error.response.data);
  //   }
  // }

  const getApartments = async () => {
    try {
      const response = await getApartmentsRequest()
      setApartments(response.data)
    } catch (error) {
      setErrorsApartment(error.response.data);
    }
  }

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
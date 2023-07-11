import { createContext, useContext } from "react";
import { useState } from 'react';
import { createApartmentRequest, getApartmentsRequest } from "../api/apartment.calls";

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
  const createApartment = async (dataApartment) => {
    try {
      const response = await createApartmentRequest(dataApartment)
      console.log(response);
    } catch (error) {
      setErrorsApartment(error.response.data);
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

  return (
    <ApartmentContext.Provider value={{
      // Aca van las funciones y estados
      errorsApartment,
      apartments,
      createApartment,
      getApartments
    }}>
      {children}
    </ApartmentContext.Provider>
  )
}
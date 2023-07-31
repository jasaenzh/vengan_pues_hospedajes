import { createContext, useContext, useEffect } from "react";
import { useState } from 'react';
import { createApartmentRequest, deleteApartmentRequest, deleteImageByIdRequest, getApartmentsRequest, updateApartmentRequest } from "../api/apartment.calls";
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
  const createApartmentContext = async (dataApartment, tokenHeader) => {
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

  // Obtener apartamentos
  const getApartments = async () => {
    try {
      const response = await getApartmentsRequest()
      setApartments(response.data)
    } catch (error) {
      setErrorsApartment(error.response.data);
    }
  }

  // Obtener apartamento por id
  const getApartment = async (id) => {
    try {
      const response = await getApartmentsRequest(id)
      return response.data
    } catch (error) {
      setErrorsApartment(error.response.data);
    }
  }

  // Eliminar apartamento
  const deleteApartment = async (id) => {
    try {
      const response = await deleteApartmentRequest(id)
      if (response.status === 204) setApartments(apartments.filter(apartment => apartment.id !== id))
    } catch (error) {
      setErrorsApartment(error.response.data);
    }
  }

  // Actualizar apartamento
  const updateApartment = async (id, dataApartment) => {
    try {
      const response = await updateApartmentRequest(id, dataApartment)
      if (response.status === 204) setApartments(apartments.filter(apartment => apartment.id !== id))
      return response
    } catch (error) {
      setErrorsApartment(error.response.data);
    }
  }

  // Eliminar imagen de apartamento
  const deleteImageApartment = async (id, imageIndex) => {
    try {
      const response = await deleteImageByIdRequest(id, imageIndex)
      if (response.status === 200) setApartments(apartments.filter(apartment => apartment.id !== id))
      return response
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
      createApartmentContext,
      getApartments,
      deleteApartment,
      getApartment,
      updateApartment,
      deleteImageApartment
    }}>
      {children}
    </ApartmentContext.Provider>
  )
}
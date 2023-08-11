import { createContext, useContext, useEffect } from "react";
import { useState } from 'react';
import { createBookingRequest, getBookingsByApartmentPublicRequest } from "../api/bookings.calls";
import Cookies from 'js-cookie'

export const BookingContext = createContext();

export const useBookingContext = () => {
  const contextBooking = useContext(BookingContext);
  if (!contextBooking) throw new Error('useApartmentContext debe estar dentro de un AuthProvider');
  return (contextBooking);
}

export const BookingProvider = ({ children }) => {

  // Estado global
  const [bookings, setBookings] = useState([]);

  // Creo el estado de errores
  const [errorsBooking, setErrorsBooking] = useState([]);

  // Crear reserva
  const createBookingContext = async (dataBooking, tokenHeader) => {
    try {
      const response = await createBookingRequest(dataBooking);
      Cookies.set('token', tokenHeader);
      return response
    } catch (error) {
      const errorMessage = Array.isArray(error.response.data) ? error.response.data : [error.response.data];
      setErrorsBooking(errorMessage);
      return error.response
    }
  }

  const getBookingsByApartmentPublicContext = async (apartmentId) => {
    try {
      const response = await getBookingsByApartmentPublicRequest(apartmentId)
      return response
    } catch (error) {
      const errorMessage = Array.isArray(error.response.data) ? error.response.data : [error.response.data];
      setErrorsBooking(errorMessage);
      return error.response
    }

  }

  /** Si hay errores, seteamos un timeout para que desaparezcan */
  useEffect(() => {
    if (errorsBooking.length > 0) {
      const timer = setTimeout(() => {
        setErrorsBooking([])
      }, 5000);
      return () => clearTimeout(timer)
    }
  }, [errorsBooking])

  return (
    <BookingContext.Provider value={{
      errorsBooking,
      bookings,
      setBookings,
      createBookingContext,
      getBookingsByApartmentPublicContext
    }}>
      {children}
    </BookingContext.Provider>
  )

}
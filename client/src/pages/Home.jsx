/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useApartmentContext } from '../context/ApartmentContext';
import CardApartmentHome from '../components/CardApartmentHome';

function Home() {
  const { user, isAuthenticated, loading } = useAuth();

  const { getApartments, apartments } = useApartmentContext();

  const navigate = useNavigate();

  useEffect(() => {
    getApartments();
    if (isAuthenticated && user.emailVerified === false) {
      navigate("/validar-email")
    } else if (isAuthenticated && user.emailVerified === true) {
      navigate("/")
    }
  }, [user, isAuthenticated, navigate])




  return (
    <div className='bg-slate-300 max-h-full max-w-full grid grid-cols-1 sm:grid-cols-2 p-3 gap-2'>
      {loading ? (
        <div>Cargando...</div>
      ) : (apartments && apartments?.length === 0 ? (
        <div>
          <p>No hay apartamentos para mostrar...</p>
        </div>
      ) : (
        apartments?.map((aparment, key) => (
          <CardApartmentHome key={key} aparment={aparment} />
        ))
      ))}
    </div>
  )
}

export default Home
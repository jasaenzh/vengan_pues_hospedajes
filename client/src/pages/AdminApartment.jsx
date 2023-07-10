/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom"
import { useApartmentContext } from "../context/ApartmentContext"
import { useEffect } from "react";
import ApartmentCard from "./ApartmentCard";


function AdminApartment() {

  const { getApartments, apartments } = useApartmentContext();

  useEffect(() => {
    getApartments();
  }, [])



  return (
    <div>
      <h1 className="text-center">AdminApartment</h1>
      <div className="flex justify-end gap-5">
        <Link to="/admin-apartamentos/crear-apartamento">Crear Apartamento</Link>
      </div>

      <div className="grid grid-cols-3 gap-3">

        {apartments.length === 0 ? (
          <p>No hay apartamentos</p>
        ) : (
          apartments.map((apartment, index) => (
            <ApartmentCard key={index} apartment={apartment} />
          ))
        )}

      </div>

    </div>
  )
}

export default AdminApartment
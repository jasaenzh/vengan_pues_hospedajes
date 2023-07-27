/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom"
import { useApartmentContext } from "../context/ApartmentContext"
import { useEffect } from "react";
import ApartmentCard from "./ApartmentCard";


function AdminApartment() {

  const { getApartments, apartments, deleteApartment } = useApartmentContext();

  useEffect(() => {
    getApartments();
  }, [])

  const handleDeleteApartment = async (apartmentId) => {
    await deleteApartment(apartmentId);
    getApartments(); // Actualizar manualmente la lista de apartamentos después de borrar uno
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Administrar apartamentos</h1>
      <div className="flex justify-end gap-5">
        <Link to="/admin-apartamentos/crear-apartamento" className='bg-[#206D53] hover:bg-[#1E5A41] px-2 py-2 rounded-md my-2 hover:no-underline text-white'>Crear apartamento</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

        {apartments.length === 0 ? (
          <p>No hay apartamentos</p>
        ) : (
          apartments.map((apartment, index) => (
            <ApartmentCard key={index} apartment={apartment} handleDeleteApartment={handleDeleteApartment} getApartments={getApartments} />
          ))
        )}

      </div>

    </div>
  )
}

export default AdminApartment
import Carousel from '../components/Carousel';
import { Link } from "react-router-dom"

// Aca se podria colocar un video
// <video src={ruta} alt={`Video` autoPlay muted loop} />
function ApartmentCard({ apartment, handleDeleteApartment }) {


  return (
    <div className='bg-[#E3AE40] px-6 py-4 rounded shadow-2xl'>

      <div className='grid grid-cols-2 gap-2 mb-2'>
        {/* Boton eliminar */}
        <button
          className='bg-[#EF6B71] mt-4 hover:bg-[#f59196] text-white font-bold py-2 px-4 rounded'
          onClick={() => {
            const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este apartamento?");

            if (confirmation) {
              handleDeleteApartment(apartment._id);
            }

          }}
        >
          Eliminar
        </button>

        {/* Boton editar */}
        <Link
          to={`/admin-apartamentos/crear-apartamento/${apartment._id}`}
          className='bg-[#6E3D1F] mt-4 hover:bg-[#856d5e] text-white font-bold py-2 px-4 rounded'>
          Editar
        </Link>
      </div>

      <Carousel autoSlide={true} autoSlideInterval={5000}>
        {
          apartment.image.map((image, index) => (
            <img key={index} src={image.secure_url} alt={index} />
          ))
        }
      </Carousel>

      <div className='grid grid-cols-2 col-gap-1'>

        {/* Numero de apartamento  */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Numero de Apartamento </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.apartmentNumber}</span>


        {/* Ubicacion */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Locación </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.location}</span>


        {/* Area */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Area </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.squareMeter} m2</span>


        {/* Precio */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Precio </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>$ {apartment.price}</span>


        {/* Camas duplex */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Duplex </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.duplex ? 'Si' : 'No'}</span>


        {/* Numero de habitaciones  */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Habitaciones </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.bedrooms}</span>


        {/* Camas dobles */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Camas dobles </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.doubleBeds}</span>


        {/* Camas sencillas  */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Camas sencillas </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.singleBeds}</span>


        {/* Camas tipo nido  */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Camas tipo nido </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.trundleBed}</span>


        {/* Numero de baños   */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Baños </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.bathrooms}</span>


        {/* Agua caliente */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Agua caliente: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.hotWater ? 'Si' : 'No'}</span>


        {/* Secador de cabello  */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Secador de cabello: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.hairdryer}</span>


        {/* Sala de estar */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Sala de estar: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.livingRoom ? 'Si' : 'No'}</span>


        {/* Comedor */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Comedor: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.diningRoom}</span>


        {/* Sofa cama */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Sofa cama: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.sofaBed}</span>


        {/* Televisor */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Televisor: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.tv}</span>


        {/* Internet  */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Internet: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.internet ? 'Si' : 'No'}</span>


        {/* Cocina */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Cocina: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.kitchen ? 'Si' : 'No'}</span>


        {/* Nevera */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Nevera: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.fridge ? 'Si' : 'No'}</span>


        {/* Lavadora */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Lavadora: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.washingMachine ? 'Si' : 'No'}</span>


        {/* Microondas  */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Microondas: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.microwave ? 'Si' : 'No'}</span>


        {/* Cafetera */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Cafetera: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.coffeeMaker ? 'Si' : 'No'}</span>


        {/* Licuadora */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Licuadora: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.dishwasher ? 'Si' : 'No'}</span>


        {/* Tostadora de pan */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Tostadora de pan: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.breadToaster ? 'Si' : 'No'}</span>


        {/* Olla de presion */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Olla de presión: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.pressureCooker ? 'Si' : 'No'}</span>


        {/* Olla arrocera */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Olla arrocera: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.riceCooker ? 'Si' : 'No'}</span>


        {/* Sanduchera */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Sanduchera: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.grill ? 'Si' : 'No'}</span>


        {/* Camaras de seguridad */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Camaras de seguridad: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.securityCameras ? 'Si' : 'No'}</span>


        {/* Terraza con vista */}
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>Terraza con vista: </span>
        <span className='text-xs sm:text-sm md:text-base lg:text-lg'>{apartment.terraceWithView ? 'Si' : 'No'}</span>


      </div>






    </div>
  )
}


export default ApartmentCard;
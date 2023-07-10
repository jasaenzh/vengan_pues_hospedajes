import Carousel from '../components/Carousel';

// Aca se podria colocar un video
// <video src={ruta} alt={`Video` autoPlay muted loop} />
function ApartmentCard({ apartment }) {
  return (
    <div className='bg-slate-300 px-6 py-4 rounded shadow-2xl'>

      <Carousel autoSlide={true} autoSlideInterval={5000}>
        {
          apartment.images.map((image, index) => (
            <img key={index} src={image.secure_url} alt={index} />
          ))
        }
      </Carousel>

      <div>
        <div>
          <label>Numero de Apartamento: </label>
          <span>{apartment.apartmentNumber}</span>
        </div>

        <div>
          <label>Locación: </label>
          <span>{apartment.location}</span>
        </div>

        <div>
          <label>Area: </label>
          <span>{apartment.squareMeter} m2</span>
        </div>

        <div>
          <label>Precio: </label>
          <span>{apartment.price} $</span>
        </div>

        <div>
          <label>Duplex: </label>
          <span>{apartment.duplex ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Habitaciones: </label>
          <span>{apartment.bedrooms}</span>
        </div>

        <div>
          <label>Camas dobles: </label>
          <span>{apartment.doubleBeds}</span>
        </div>

        <div>
          <label>Camas sencillas: </label>
          <span>{apartment.singleBeds}</span>
        </div>

        <div>
          <label>Camas tipo nido: </label>
          <span>{apartment.trundleBed}</span>
        </div>

        <div>
          <label>Baños: </label>
          <span>{apartment.bathrooms}</span>
        </div>

        <div>
          <label>Agua caliente: </label>
          <span>{apartment.hotWater ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Secador de cabello: </label>
          <span>{apartment.hairdryer}</span>
        </div>

        <div>
          <label>Sala de estar: </label>
          <span>{apartment.livingRoom ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Comedor: </label>
          <span>{apartment.diningRoom}</span>
        </div>

        <div>
          <label>Sofa cama: </label>
          <span>{apartment.sofaBed}</span>
        </div>

        <div>
          <label>Televisor: </label>
          <span>{apartment.tv}</span>
        </div>

        <div>
          <label>Internet: </label>
          <span>{apartment.internet ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Cocina: </label>
          <span>{apartment.kitchen ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Nevera: </label>
          <span>{apartment.fridge ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Lavadora: </label>
          <span>{apartment.washingMachine ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Microondas: </label>
          <span>{apartment.microwave ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Cafetera: </label>
          <span>{apartment.coffeeMaker ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Licuadora: </label>
          <span>{apartment.dishwasher ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Tostadora de pan: </label>
          <span>{apartment.breadToaster ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Olla de presion: </label>
          <span>{apartment.pressureCooker ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Olla arrocera: </label>
          <span>{apartment.riceCooker ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Sanduchera: </label>
          <span>{apartment.grill ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Camaras de seguridad: </label>
          <span>{apartment.securityCameras ? 'Si' : 'No'}</span>
        </div>

        <div>
          <label>Terraza con vista: </label>
          <span>{apartment.terraceWithView ? 'Si' : 'No'}</span>
        </div>
      </div>

      <div className='flex justify-center'>
        <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Editar</button>
      </div>




    </div>
  )
}


export default ApartmentCard;
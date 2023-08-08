import React, { useState } from 'react';
import Carousel from './Carousel';
import StarsCalification from './StarsCalification';
import { useForm } from 'react-hook-form';
import Calendario from './Calendario';

const CardApartmentHome = (apartment) => {

  const apartamento = apartment.aparment
  let bedroomsLabel = apartamento.bedrooms === 1 ? 'habitación' : 'habitaciones';
  let doubleBedsLabel = apartamento.doubleBeds === 1 ? 'cama doble' : 'camas dobles';
  let singleBedsLabel = apartamento.singleBeds === 1 ? 'cama sencilla' : 'camas sencillas';

  const { register, handleSubmit, setValue } = useForm();


  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const onSubmitBookings = handleSubmit(async (values) => {
    console.log("Valores", values)

  });

  return (
    <div className='mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow'>
      <Carousel autoSlide={true} autoSlideInterval={5000}>
        {
          apartment.aparment && apartment.aparment.image.map((image, index) => (
            <img key={index} src={image.secure_url} alt={index} />
          ))
        }
      </Carousel>
      <div className='p-4'>
        {/* Titulo */}
        <h3 className='text-xl font-medium text-gray-900'>
          Apartamento {apartamento.apartmentNumber}
        </h3>

        {/* Subtitulo */}
        <span className='text-gray-600 grid grid-cols-3 mt-2'>
          <span className='min-w-min'>${apartamento.price}</span>
          <span className='col-span-2 flex justify-end'><StarsCalification /></span>
        </span>

        {/* Texto */}
        <p className='mt-1 text-gray-500'>
          <span>{apartamento.duplex === true ? 'Dúplex, ' : ''}</span>
          <span>Ubicado en el {apartamento.location}, </span>
          <span>cuenta con {apartamento.bedrooms} {bedroomsLabel}</span>
          <span> equipada{apartamento.doubleBeds > 1 || apartamento.singleBeds > 1 ? '' : 's'} con </span>
          <span>{apartamento.doubleBeds && apartamento.doubleBeds !== 0 ? ` ${apartamento.doubleBeds} ${doubleBedsLabel}` : ''}</span>
          <span>
            {
              apartamento.singleBeds && apartamento.singleBeds !== 0
                ? `${apartamento.doubleBeds && apartamento.doubleBeds !== 0
                  ? ' y la otra con '
                  : ''}${apartamento.singleBeds} ${singleBedsLabel}`
                : ''
            },
          </span>
          <span> {apartamento.bathrooms} baño{apartamento.bathrooms === 1 ? '' : 's'} {apartamento.hotWater === true ? ` con agua caliente` : ``}</span>
          <span>{apartamento.hairdryer >= 1 ? `, secador de cabello` : ``}</span>
          <span>{apartamento.livingRoom === true ? `, sala` : ``}</span>
          <span>{apartamento.diningRoom >= 1 ? `, comedor` : ``}</span>
          <span>{apartamento.sofaBed >= 1 ? `, sofá cama` : ``}</span>
          <span>{apartamento.tv >= 1 ? `, televisor` : ``}</span>
          <span>{apartamento.internet === true ? `, internet` : ``}</span>
          <span>{apartamento.kitchen === true ? `, cocina equipada con` : ``}</span>
          <span>{apartamento.fridge === true ? ` nevera` : ``}</span>
          <span>{apartamento.washingMachine === true ? `, lavadora` : ``}</span>
          <span>{apartamento.microwave === true ? `, microondas` : ``}</span>
          <span>{apartamento.coffeeMaker === true ? `, cafetera` : ``}</span>
          <span>{apartamento.dishwasher === true ? `, licuadora` : ``}</span>
          <span>{apartamento.breadToaster === true ? `, tostador de pan` : ``}</span>
          <span>{apartamento.pressureCooker === true ? `, olla presión` : ``}</span>
          <span>{apartamento.riceCooker === true ? `, olla arrocera con vaporera` : ``}</span>
          <span>{apartamento.grill === true ? `, sandwichera` : ``}</span>
          <span>{apartamento.securityCameras === true ? `, cámaras de seguridad en exteriores` : ``}</span>
          <span>{apartamento.terraceWithView === true ? `, terraza con vista panorámica` : ``}</span>
        </p>
      </div>
      <div>
        <button
          onClick={openModal}
          className='bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 w-full'>
          Reservar
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 max-w-7xl'>
            {/* Tutilo Modal */}
            <div className='flex justify-between items-center border-b-2 pb-2 mb-4'>
              <h1 className='text-xl font-bold py-2 px-4 text-center w-full mb-4 mt-4'>
                Reservar
              </h1>
              <button
                type='button'
                className='bg-red-400 hover:bg-red-600 text-white font-bold py-[10px] px-4'
                onClick={closeModal}
              >
                X
              </button>
            </div>

            <div className='grid grid-cols-2 gap-3'>

              {/* Div para el formulario */}
              <div className='flex flex-col justify-center items-center w-full gap-3 p-5'>
                <form className='grid grid-cols-1 sm:grid-cols-3 gap-2' onSubmit={onSubmitBookings} encType="multipart/form-data">
                  <div>
                    <label htmlFor='start-date' className=''>
                      <input
                        className='h-10 w-max p-5 border-2 border-gray-300 rounded-lg border-opacity-80 outline-none focus:border-green-400 focus:text-gray-400 transition duration-200'
                        type='date'
                        id='start-date'
                        {...register('startDate')}
                      />
                    </label>

                  </div>
                  {/* Flecha */}
                  <div className='flex justify-center items-center max-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" className=" icon icon-tabler icon-tabler-arrow-narrow-right" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l14 0" />
                      <path d="M15 16l4 -4" />
                      <path d="M15 8l4 4" />
                    </svg>
                  </div>
                  <div>
                    <label htmlFor='end-date'>
                      <input
                        className='h-10 w-max p-5 border-2 border-gray-300 rounded-lg border-opacity-80 outline-none focus:border-green-400 focus:text-gray-400 transition duration-200'
                        type='date'
                        id='end-date'
                        {...register('endDate')}
                      />
                    </label>
                  </div>
                  <button className='col-span-3 block w-full bg-[#206D53] px-2 py-2 my-2 hover:no-underline text-white'> crear reservar</button>
                </form>

                {/* Respuesta del formulario  */}
                <div>
                  Aca va la respuesta
                </div>
              </div>




              {/* Div para calendario */}
              <div>
                <Calendario />
              </div>

            </div>


          </div>
        </div>
      )}
    </div>
  );
}

export default CardApartmentHome;

// {/* <span className="col-span-1 bg-red-400 w-1/2">${apartment.aparment.price} | </span>
//           <span className='col-span-3'><StarsCalification /></span> */}

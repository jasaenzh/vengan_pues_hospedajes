import React from 'react';
import Carousel from './Carousel';
import StarsCalification from './StarsCalification';

const CardApartmentHome = (apartment) => {

  console.log("Apartamento:", apartment)
  console.log(typeof apartment.aparment.bedrooms)
  const apartamento = apartment.aparment
  let bedroomsLabel = apartamento.bedrooms === 1 ? 'habitación' : 'habitaciones';
  let doubleBedsLabel = apartamento.doubleBeds === 1 ? 'cama doble' : 'camas dobles';
  let singleBedsLabel = apartamento.singleBeds === 1 ? 'cama sencilla' : 'camas sencillas';

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
        </p>
      </div>
    </div>
  );
}

export default CardApartmentHome;

// {/* <span className="col-span-1 bg-red-400 w-1/2">${apartment.aparment.price} | </span>
//           <span className='col-span-3'><StarsCalification /></span> */}

import React from 'react';
import Carousel from './Carousel';
import StarsCalification from './StarsCalification';

const CardApartmentHome = (apartment) => {

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
    </div>
  );
}

export default CardApartmentHome;

// {/* <span className="col-span-1 bg-red-400 w-1/2">${apartment.aparment.price} | </span>
//           <span className='col-span-3'><StarsCalification /></span> */}

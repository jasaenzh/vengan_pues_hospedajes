import React from 'react';
import { useForm } from 'react-hook-form';
import { useApartmentContext } from '../context/ApartmentContext';
import { useNavigate } from 'react-router-dom';


function CreateApartment() {
  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate()

  const { createApartmentContext, errorsApartment } = useApartmentContext()

  function getCookieValue(cookieName) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === cookieName) {
        return cookie[1];
      }
    }
    return "";
  }

  const onSubmitApartment = handleSubmit(async (values) => {

    const data = {
      ...values,
      squareMeter: parseInt(values.squareMeter),
      price: parseInt(values.price),
      duplex: values.duplex === 'true' ? true : false,
      bedrooms: parseInt(values.bedrooms),
      doubleBeds: parseInt(values.doubleBeds),
      singleBeds: parseInt(values.singleBeds),
      trundleBed: parseInt(values.trundleBed),
      bathrooms: parseInt(values.bathrooms),
      hotWater: values.hotWater === 'true' ? true : false,
      hairdryer: parseInt(values.hairdryer),
      livingRoom: values.livingRoom === 'true' ? true : false,
      diningRoom: parseInt(values.diningRoom),
      sofaBed: parseInt(values.sofaBed),
      tv: parseInt(values.tv),
      internet: values.internet === 'true' ? true : false,
      kitchen: values.kitchen === 'true' ? true : false,
      fridge: values.fridge === 'true' ? true : false,
      washingMachine: values.washingMachine === 'true' ? true : false,
      microwave: values.microwave === 'true' ? true : false,
      coffeeMaker: values.coffeeMaker === 'true' ? true : false,
      dishwasher: values.dishwasher === 'true' ? true : false,
      breadToaster: values.breadToaster === 'true' ? true : false,
      pressureCooker: values.pressureCooker === 'true' ? true : false,
      riceCooker: values.riceCooker === 'true' ? true : false,
      grill: values.grill === 'true' ? true : false,
      securityCameras: values.securityCameras === 'true' ? true : false,
      terraceWithView: values.terraceWithView === 'true' ? true : false,
      image: values.image,
    }

    console.log("DATA FRONT", data)

    const tokenHeader = getCookieValue("token");
    const response = await createApartmentContext(data, tokenHeader)
    console.log("RESPONSE", response)
    if (response && response.status === 200) {
      navigate('/admin-apartamentos')
    }
  })

  return (
    <div className='flex justify-center'>
      {
        errorsApartment && errorsApartment.map((error, index) => (
          <div key={index} className="text-red-500 flex">
            <span>{error}</span>
          </div>
        ))
      }
      <div className='bg-[#E3AE40] sm:max-w-xl px-20 py-5 rounded-md'>
        <form onSubmit={onSubmitApartment} encType="multipart/form-data">

          <div className='grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-1'>

            {/* Subir imagenes */}
            <div className='grid grid-cols-1'>

              <label htmlFor='images' className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>Imagen</label>
              <input
                type="file"
                // name='image'
                id='image'
                multiple
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                {...register('image')} />

            </div>

            {/* Numero de apartamento */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='apartmentNumber'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                # de Apartamento
              </label>
              <input
                type='text'
                id='apartmentNumber'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='# de apartamento'
                {...register('apartmentNumber')} />
            </div>

            {/* Ubicación */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='location'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Ubicación
              </label>
              <input
                type='text'
                id='location'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Ubicación'
                {...register('location')} />
            </div>

            {/* Área */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='squareMeter'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Área
              </label>
              <input
                type='number'
                id='squareMeter'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Área'
                {...register('squareMeter')} />
            </div>


            {/* Precio */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='price'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Precio
              </label>
              <input
                type='number'
                id='price'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Precio'
                {...register('price')} />
            </div>

            {/* Duplex */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='squareMeter'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Duplex
              </label>
              <select
                id="duplex"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('duplex')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Numero de habitaciones  */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='bedrooms'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Habitaciones
              </label>
              <input
                type='number'
                id='bedrooms'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Habitaciones'
                {...register('bedrooms')} />
            </div>

            {/* Numero de camas dobles  */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='doubleBeds'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Camas dobles
              </label>
              <input
                type='number'
                id='doubleBeds'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Camas dobles'
                {...register('doubleBeds')} />
            </div>


            {/* Numero de camas sencillas  */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='singleBeds'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Camas sencillas
              </label>
              <input
                type='number'
                id='singleBeds'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Camas sencillas'
                {...register('singleBeds')} />
            </div>

            {/* Numero de camas tipo nido  */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='trundleBed'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Camas tipo nido
              </label>
              <input
                type='number'
                id='trundleBed'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Camas tipo nido'
                {...register('trundleBed')} />
            </div>

            {/* Numero de camas tipo nido  */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='bathrooms'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Baños
              </label>
              <input
                type='number'
                id='bathrooms'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Baños'
                {...register('bathrooms')} />
            </div>


            {/* Agua caliente */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='hotWater'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Agua caliente
              </label>
              <select
                id="hotWater"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('hotWater')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Secador de cabello  */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='hairdryer'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Secador de cabello
              </label>
              <input
                type='number'
                id='hairdryer'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Secador de cabello'
                {...register('hairdryer')} />
            </div>

            {/* Sala de estar */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='livingRoom'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Sala de estar
              </label>
              <select
                id="livingRoom"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('livingRoom')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>


            {/* Comedor  */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='diningRoom'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Comedor
              </label>
              <input
                type='number'
                id='diningRoom'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Comedor'
                {...register('diningRoom')} />
            </div>

            {/* Sofa cama  */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='sofaBed'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Sofa cama
              </label>
              <input
                type='number'
                id='sofaBed'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Sofa cama'
                {...register('sofaBed')} />
            </div>

            {/* Televisores  */}
            <div className='grid grid-cols-1  sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='tv'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Televisores
              </label>
              <input
                type='tv'
                id='sofaBed'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                placeholder='Televisores'
                {...register('tv')} />
            </div>

            {/* Internet  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='internet'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Internet
              </label>
              <select
                id="internet"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('internet')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Cocina  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='kitchen'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Cocina
              </label>
              <select
                id="kitchen"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('kitchen')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Nevera  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='fridge'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Nevera
              </label>
              <select
                id="fridge"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('fridge')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>


            {/* Lavadora  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='washingMachine'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Lavadora
              </label>
              <select
                id="washingMachine"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('washingMachine')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Microondas  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='microwave'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Microondas
              </label>
              <select
                id="microwave"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('microwave')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Cafetera  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='coffeeMaker'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Cafetera
              </label>
              <select
                id="coffeeMaker"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('coffeeMaker')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Licuadora  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='dishwasher'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Licuadora
              </label>
              <select
                id="dishwasher"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('dishwasher')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Tostadora de pan  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='breadToaster'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Tostadora de pan
              </label>
              <select
                id="breadToaster"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('breadToaster')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Olla de presion  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='pressureCooker'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Olla de presion
              </label>
              <select
                id="pressureCooker"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('pressureCooker')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Olla arrocera  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='riceCooker'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Olla arrocera
              </label>
              <select
                id="riceCooker"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('riceCooker')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Sanduchera  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='grill'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Sanduchera
              </label>
              <select
                id="grill"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('grill')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Camaras de seguridad  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='securityCameras'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Camaras de seguridad
              </label>
              <select
                id="securityCameras"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('securityCameras')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

            {/* Terraza con vista  */}
            <div className='grid grid-cols-1 sm:grid-cols-2 sm:cols-gap-1 sm:mb-2 items-center mt-2 sm:mt-0'>
              <label
                htmlFor='terraceWithView'
                className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>
                Terraza con vista
              </label>
              <select
                id="terraceWithView"
                className="block w-full p-[6px] mt-1 text-sm text-[#9EA6B2] border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('terraceWithView')}
              >
                <option value=''>Selecciona</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
              </select>
            </div>

          </div>



          <div className='grid grid-cols-2 mt-3 gap-2 items-center'>
            <button className='bg-[#EF6B71] px-2 py-2 rounded-full my-2 hover:no-underline text-white'>Cancelar</button>
            <button className='bg-[#206D53] px-2 py-2 rounded-full my-2 hover:no-underline text-white'>Guardar</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default CreateApartment
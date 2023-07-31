/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApartmentContext } from '../context/ApartmentContext';
import { useNavigate, useParams } from 'react-router-dom';


function CreateApartment() {
  const { register, handleSubmit, setValue, watch } = useForm();

  const navigate = useNavigate();

  const params = useParams();

  const { createApartmentContext, errorsApartment, getApartment, updateApartment, deleteImageApartment } = useApartmentContext();

  const [imageDeleted, setImageDeleted] = useState(false);

  useEffect(() => {
    async function loadApartment() {
      if (params.id) {
        const getApartmentById = await getApartment(params.id);
        setValue('apartmentNumber', getApartmentById[0].apartmentNumber);
        setValue('location', getApartmentById[0].location);
        setValue('squareMeter', getApartmentById[0].squareMeter);
        setValue('price', getApartmentById[0].price);
        setValue('duplex', getApartmentById[0].duplex === true ? 'true' : 'false');
        setValue('bedrooms', getApartmentById[0].bedrooms);
        setValue('doubleBeds', getApartmentById[0].doubleBeds);
        setValue('singleBeds', getApartmentById[0].singleBeds);
        setValue('trundleBed', getApartmentById[0].trundleBed);
        setValue('bathrooms', getApartmentById[0].bathrooms);
        setValue('hotWater', getApartmentById[0].hotWater === true ? 'true' : 'false');
        setValue('hairdryer', getApartmentById[0].hairdryer);
        setValue('livingRoom', getApartmentById[0].livingRoom === true ? 'true' : 'false');
        setValue('diningRoom', getApartmentById[0].diningRoom);
        setValue('sofaBed', getApartmentById[0].sofaBed);
        setValue('tv', getApartmentById[0].tv);
        setValue('internet', getApartmentById[0].internet === true ? 'true' : 'false');
        setValue('kitchen', getApartmentById[0].kitchen === true ? 'true' : 'false');
        setValue('fridge', getApartmentById[0].fridge === true ? 'true' : 'false');
        setValue('washingMachine', getApartmentById[0].washingMachine === true ? 'true' : 'false');
        setValue('microwave', getApartmentById[0].microwave === true ? 'true' : 'false');
        setValue('coffeeMaker', getApartmentById[0].coffeeMaker === true ? 'true' : 'false');
        setValue('dishwasher', getApartmentById[0].dishwasher === true ? 'true' : 'false');
        setValue('breadToaster', getApartmentById[0].breadToaster === true ? 'true' : 'false');
        setValue('pressureCooker', getApartmentById[0].pressureCooker === true ? 'true' : 'false');
        setValue('riceCooker', getApartmentById[0].riceCooker === true ? 'true' : 'false');
        setValue('grill', getApartmentById[0].grill === true ? 'true' : 'false');
        setValue('securityCameras', getApartmentById[0].securityCameras === true ? 'true' : 'false');
        setValue('terraceWithView', getApartmentById[0].terraceWithView === true ? 'true' : 'false');
        setValue('image', getApartmentById[0].image);
      }
    }
    loadApartment()
  }, [params.id, imageDeleted])

  // Obtén el valor actual del campo "image" utilizando watch
  const watchedImageFiles = watch('image');

  const handleCancelar = () => {
    navigate(-1)
  }



  // Utiliza useMemo para evitar ejecutar esta función en cada renderizado
  const renderSelectedImages = useMemo(() => {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-2'>
        {Array.isArray(watchedImageFiles) &&
          watchedImageFiles?.map((file, imageIndex) => (

            <div key={imageIndex} className='relative'>
              <button
                type='button'
                onClick={async () => {
                  const response = await deleteImageApartment(params.id, imageIndex)
                  if (response.status === 200) {
                    alert('Imagen eliminada')
                    setImageDeleted(!imageDeleted)
                  }
                }}
                className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded' >
                X
              </button>
              <img
                key={imageIndex}
                src={file.secure_url}
                alt={`Imagen ${imageIndex}`}
                className='object-cover w-full h-full'
              />
            </div>

          ))}
      </div>
    );
  }, [watchedImageFiles]);

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

    if (params.id) {
      console.log("Actualizar Apartamento")
      const tokenHeader = getCookieValue("token");
      const responseUpdateApartment = await updateApartment(params.id, data, tokenHeader)
      console.log(responseUpdateApartment)
      if (responseUpdateApartment && responseUpdateApartment.status === 200) {
        navigate('/admin-apartamentos');
      }
    } else {
      const tokenHeader = getCookieValue("token");
      const responseCreateApartment = await createApartmentContext(data, tokenHeader)
      if (responseCreateApartment && responseCreateApartment.status === 200) {
        navigate('/admin-apartamentos')
      }
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

              {params.id ? (
                <div>
                  {/* Aca van las imagenes mapeadas */}
                  {renderSelectedImages}
                </div>
              ) : (
                <div>
                  <label htmlFor='images' className='block text-sm md:font-medium text-slate-100 sm:py-1 sm:px-2'>Imagen</label>
                  <input
                    type="file"
                    // name='image'
                    id='image'
                    multiple
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs md:text-sm py-2 px-2'
                    {...register('image')} />
                </div>
              )}

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
                value={watch('duplex')}
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
            <button onClick={handleCancelar} type='button' className='bg-[#EF6B71] px-2 py-2 rounded-full my-2 hover:no-underline text-white'>Cancelar</button>
            <button className='bg-[#206D53] px-2 py-2 rounded-full my-2 hover:no-underline text-white'>{params.id ? 'Actualizar' : 'Crear'}</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default CreateApartment
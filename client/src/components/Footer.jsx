import React from 'react';
import { FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer className='relative bg-[#3A6052] pt-8 pb-6 mt-3'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap text-left lg:text-left'>
          <div className='w-full lg:w-6/12 px-4'>
            <h4 className='text-3xl font-semibold text-slate-100'>¡Permanezcamos Conectados!</h4>
            <h5 className='text-lg mt-0 mb-2 text-slate-300'>Encuéntranos en Estas Plataformas, Respondemos en un Plazo de 1-2 Días Hábiles.</h5>
            <div className='mt-6 lg:mb-0 mb-6'>
              <button className=''>
                {/* Instagram */}
                <a href="https://instagram.com/venganpues?igshid=MzRlODBiNWFlZA==" target='_blank' rel='noopener noreferrer'>
                  <FaInstagram className='bg-white text-green-700 shadow-lg font-normal h-12 w-12 items-center justify-center rounded-full outline-none focus:outline-none mr-2 p-1 hover:text-green-900' />
                </a>
                {/* Otra Red */}
              </button>
            </div>
          </div>


          <div className='w-full lg:w-6/12 px-4'>
            <div className='flex flex-wrap items-start mb-6'>

              <div className='w-full lg:w-4/12 px-4 ml-auto'>

                <span className='block uppercase text-green-300 text-sm font-semibold mb-2'>Menu 1</span>
                <ul className='list-unstyled'>

                  <li>
                    <button href="#" className='text-green-500 hover:text-green-700 font-semibold block pb-2 text-sm'>Acerca</button>
                  </li>

                </ul>

              </div>

              <div className='w-full lg:w-4/12 px-4 ml-auto'>

                <span className='block uppercase text-green-300 text-sm font-semibold mb-2'>Menu 2</span>
                <ul className='list-unstyled'>

                  <li>
                    <button href="#" className='text-green-500 hover:text-green-700 font-semibold block pb-2 text-sm'>Otros</button>
                  </li>

                </ul>

              </div>

            </div>



          </div>
        </div>
        <hr className='my-6 border-green-300' />


        <div className='flex flex-wrap items-center md:justify-between justify-center'>
          <div className='w-full md:w-4/12 px-4 mx-auto text-center'>
            <div className='text-sm text-green-300 font-semibold py-1'>
              Copyright © <span>2023</span> <Link className='hover:text-green-700' to="">Jhony Saenz</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

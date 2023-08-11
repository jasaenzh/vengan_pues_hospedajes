import React from 'react';
import imgLandingPage from '../assets/imgLandingPage.jpeg'

const LandingPage = () => {
  return (
    <div>
      <section className='py-10 bg-white sm:py-16 lg:py-24'>

        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>

          <div className='grid items-center grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-12'>

            <div className='relative lg:mb-12'>

              <img className="absolute -right-0 -bottom-8 xl:-bottom-12 xl:-right-4" src="https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg" alt="" />

              <div className='pl-12 pr-6'>
                <img className="relative rounded-md" src={imgLandingPage} alt="" />
              </div>

              <div className='absolute left-0 pr-12 bottom-8 xl:bottom-20'>

                <div className='max-w-xs bg-[#2A6650] rounded-lg sm:max-w-md xl:max-w-md'>

                  <div className='px-3 py-4 sm:px-5 sm:py-8'>

                    <div className='flex items-start'>

                      <p className='text-3xl sm:text-4xl'>👋</p>

                      <blockquote className='ml-5'>

                        <p className='text-sm font-medium text-white sm:text-lg'>
                          “Quieres o necesitas viajar a Medellín, hospédate con nosotros...”
                        </p>
                      </blockquote>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Segunda columna */}
            <div className='2xl:pl-16'>

              <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight'>
                Ofrecemos hospedaje en apartamentos cómodos, seguros y tranquilos.
              </h2>

              <p className='text-xl leading-relaxed text-gray-900 mt-9'>
                Con ubicación estratégica cerca al Hospital Pablo Tobón Uribe, Clínica Universitaria Bolivariana, Clínica Cardiovascular, facultad de medicina de la universidad pontificia bolivariana, facultad de ciencias agrarias de la Universidad de Antioquia, tecnológico de Antioquia, instituto universitario ITM, con fácil acceso al servicio público, supermercados, centros comerciales y sitios turísticos
              </p>

              {/* <p className='mt-6 text-xl leading-relaxed text-gray-900'>
                Velit officia conse duis enim velit mollit. Exercit ation veniam consequat sunt nostrud amet.
              </p> */}

            </div>

          </div>

        </div>

      </section>
    </div>
  );
}

export default LandingPage;

import { useEffect, useState } from 'react'
import { IonIcon } from '@ionic/react';
import { menu, close } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import logo from "../assets/iconoVenganPues.png"


function Navbar() {


  const LinksUser = [
    { name: "Inicio", link: "/" },
    { name: "Apartamentos", link: "/apartamentos" },
    { name: "Contacto", link: "/contacto" },
  ]

  const LinksAdmin = [
    { name: "Inicio", link: "/" },
    { name: "Administrar Apartamentos", link: "/admin-apartamentos" },
    { name: "Administrar Reservas", link: "/admin-reservas" },
  ]

  const LinksSupervisor = [
    { name: "Inicio", link: "/" },
    { name: "Editar apartamentos", link: "/editar-apartamentos" },
    { name: "Editar reservas", link: "/reservas" },
  ]

  const { isAuthenticated, singOut, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [linksToShow, setLinksToShow] = useState([]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setLinksToShow(LinksUser)
    } else if (isAuthenticated) {
      const userPermissions = user?.permissions;
      if (userPermissions && userPermissions.includes("adminAccess")) {
        setLinksToShow(LinksAdmin)
      } else if (userPermissions && userPermissions.includes("controlAccess")) {
        setLinksToShow(LinksSupervisor)
      }
    }

    // Cerrar el menú cuando se cambia de ruta (por si el usuario hace clic en un enlace)
    const handleRouteChange = () => {
      closeMenu();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user])


  return (
    <nav className='fixed w-full z-30 top-0 bg-white shadow-md left-0 py-2'>
      <div className='flex md:flex justify-between items-center bg-white py-4 xs:px-8 '>

        {/* Logo y titulo  de la pagina */}
        <div className='flex items-center gap-3'>
          <div className='w-14 h-14 overflow-hidden rounded-full'>
            <Link to="/">
              <img src={logo} alt="logo" className='w-full h-full object-cover' />
            </Link>
          </div>
          <div>
            <span className='text-3xl font-extrabold text-[#7B5640] font-caveat drop-shadow-md'>
              Vengan Pues...
            </span>
          </div>
        </div>

        {/* Boton para abrir el menu  */}
        <div onClick={toggleMenu} className='text-4xl absolute right-7 top-8 cursor-pointer md:hidden text-[#7B5640]'>
          <IonIcon icon={open ? `${close}` : `${menu}`} />
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px]'}`} onClick={closeMenu}>
          {
            linksToShow.map((link, index) => (
              <li key={index} className='md:ml-8 text-xl md:my-0 my-7'>
                <a
                  href={link.link}
                  className={`inline-block px-6 pb-2 pt-2.5 font-medium leading-normal md:ml-2 md:text-sm md:my-0 uppercase ${open ? 'text-lg' : 'text-xl'} font-bold text-[#7B5640] hover:text-[#5a6326a5] transition duration-500 focus:ring-0 hover:bg-green-100 hover:rounded-md hover:font-extrabold`
                  }>{link.name}</a>
              </li>
            ))
          }

          {
            isAuthenticated ? (<Link to="/" onClick={() => { singOut() }}>
              <button className={`uppercase mx-auto lg:mx-3 hover:no-underline bg-[#3A6052] font-bold rounded-full py-3 px-6 shadow opacity-75 focus:outline-none focus:shadow-transparent transform hover:scale-105 ease-in-out md:ml-5 md:text-sm md:my-0 ${open ? 'text-lg' : 'text-xl'} text-green-300 hover:text-green-600 hover:bg-green-900 duration-500`}>
                Cerrar Sesión
              </button>
              {/*  w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1*/}
            </Link>) : (<Link to="/iniciar-sesion">
              <button className={`uppercase mx-auto lg:mx-3 hover:no-underline bg-[#3A6052] font-bold rounded-full py-3 px-6 shadow opacity-75 focus:outline-none focus:shadow-transparent transform hover:scale-105 ease-in-out md:ml-5 md:text-sm md:my-0 ${open ? 'text-lg' : 'text-xl'} text-green-300 hover:text-green-600 hover:bg-green-900 duration-500`}>
                Iniciar Sesión
              </button>
            </Link>)
          }

        </ul>

      </div>
    </nav>
  )
}

export default Navbar
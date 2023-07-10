import { useEffect, useState } from 'react'
import { IonIcon } from '@ionic/react';
import { menu, close } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import logo from "../../public/iconoVenganPues.png"


function Navbar() {


  const LinksUser = [
    { name: "Inicio", link: "/" },
    { name: "Apartamentos", link: "/apartamentos" },
    { name: "Reservas", link: "/reservas" },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user])


  return (
    <div className='bg-white shadow-md w-full top-0 left-0 z-10 my-3 rounded-2xl'>
      <div className='md:flex justify-between items-center bg-white py-4 px-4 md:px-8 '>

        {/* Logo y titulo  de la pagina */}
        <div className='flex items-center gap-3'>
          <img src={logo} alt="logo" className='w-14 h-14' />
          <p className='text-2xl font-bold text-gray-800 cursor-pointer font-[Poppins]'>Vengan Pues</p>
        </div>

        {/* Boton para abrir el menu  */}
        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-20 top-6 cursor-pointer md:hidden'>
          <IonIcon icon={open ? `${close}` : `${menu}`} />
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px]'}`}>
          {
            linksToShow.map((link, index) => (
              <li key={index} className='md:ml-8 text-xl md:my-0 my-7'>
                <a href={link.link} className={`md:ml-2 md:text-sm md:my-0 ${open ? 'text-lg' : 'text-xl'} text-gray-800 hover:text-green-400 duration-500`}>{link.name}</a>
              </li>
            ))
          }

          {
            isAuthenticated ? (<Link to="/" onClick={() => { singOut() }}>
              <button className={`md:ml-5 md:text-sm md:my-0 ${open ? 'text-lg' : 'text-xl'} text-gray-800 hover:text-green-400 duration-500`}>Cerrar Sesión</button>
            </Link>) : (<Link to="/iniciar-sesion">
              <button className={`md:ml-5 md:text-sm md:my-0 ${open ? 'text-lg' : 'text-xl'} text-gray-800 hover:text-green-400 duration-500`}>Iniciar Sesión</button>
            </Link>)
          }

        </ul>

      </div>
    </div>
  )
}

export default Navbar
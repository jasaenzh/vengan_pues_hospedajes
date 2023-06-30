import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";


function Register() {

  // Libreria para manerjar Formularios
  const { register, handleSubmit, formState: { errors } } = useForm();


  // Desesctructuracion de la funcion de autenticacion
  const { checkIn, user, isAuthenticated, errorsAuth } = useAuth()

  // Libreria para navegar
  const navigate = useNavigate();


  console.log("Usuario", user)
  console.log("Autenticado", isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Paso por isAuthenticated", isAuthenticated)
      navigate('/validar-email')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate])

  const onRegisterSubmit = handleSubmit(async (values) => {
    const success = await checkIn(values);
    console.log("success", success)
  })


  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">

      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">

        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

          {
            errorsAuth.map((error, index) => (
              <div key={index} className="text-red-500">
                {error}
              </div>
            ))
          }

          <h1 className="mb-8 text-3xl text-center">Registrate</h1>
          <form onSubmit={onRegisterSubmit}>
            <div>
              {errors.username && <p className="text-red-500">El usuario es requerido</p>}
              <input
                type="text"
                id="username"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Usuario"
                {...register("username", { required: true })} />
            </div>


            <div>
              {errors.firstName && <p className="text-red-500">El nombre es requerido</p>}
              <input
                type="text"
                id="firstName"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Primer nombre"
                {...register("firstName", { required: true })} />

            </div>

            <div>
              <input
                type="text"
                id="secondName"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Segundo nombre"
                {...register("secondName")} />
            </div>

            <div>
              {errors.lastName && <p className="text-red-500">El apellido es requerido</p>}
              <input
                type="text"
                id="lastName"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Primer apellido"
                {...register("lastName", { required: true })} />

            </div>

            <div>
              <input
                type="text"
                id="secondLastName"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Segundo apellido"
                {...register("secondLastName")} />
            </div>

            <div>
              {errors.email && <p className="text-red-500">El correo es requerido</p>}
              <input
                type="text"
                id="email"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Correo" {...register("email", { required: true })} />
            </div>

            <div>
              {errors.password && <p className="text-red-500">La contraseña es requerida</p>}
              <input
                type="password"
                id="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Contraseña" {...register("password", { required: true })} />
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1">
              Registrarse
            </button>
          </form>
        </div>

        <p className="text-grey-dark mt-6">Ya tienes una cuenta?  <Link to="/iniciar-sesion" className="text-sky-500">Ingresa</Link></p>

      </div>

    </div>
  )
}

export default Register
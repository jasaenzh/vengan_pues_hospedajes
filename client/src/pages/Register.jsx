import { useForm } from "react-hook-form"
import { registerRequest } from "../api/auth.calls.js";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

function Register() {

  const { register, handleSubmit } = useForm();

  const onRegisterSubmit = handleSubmit(async (values) => {
    const response = await registerRequest(values)
    const token = Cookies.get("token")
    console.log(token)
    console.log(response)
  })

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">

      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">

        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

          <h1 className="mb-8 text-3xl text-center">Registrarse</h1>
          <form onSubmit={onRegisterSubmit}>
            <div>
              <input
                type="text"
                id="username"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Usuario"
                {...register("username", { required: true })} />
            </div>

            <div>
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
              <input
                type="text"
                id="email"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Email" {...register("email", { required: true })} />
            </div>

            <div>
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
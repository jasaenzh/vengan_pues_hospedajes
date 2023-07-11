import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react";
import Cookies from 'js-cookie';

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { singIn, errorsAuth, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    console.log("Token:", token);
  }, []);

  const onSignIn = handleSubmit(async (values) => {
    await singIn(values);
  })

  useEffect(() => {
    if (isAuthenticated) {
      // Todo: Se podria redireccionar a otra pagina de usuarios
      navigate("/");
    }
  }, [isAuthenticated, navigate])



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

          <h1 className="mb-8 text-3xl text-center">Iniciar sesión</h1>

          <form onSubmit={onSignIn}>

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
              INICIAR SESIÓN
            </button>

          </form>

          <p className="text-grey-dark mt-6">No tienes una cuenta?  <Link to="/registrarse" className="text-sky-500">Registrate</Link></p>


        </div>
      </div>
    </div>
  )
}

export default Login
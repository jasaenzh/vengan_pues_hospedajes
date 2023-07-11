import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function ValidateEmail() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const [verificationResult, setVerificationResult] = useState(null);
  const [validatingEmail, setValidatingEmail] = useState(false);

  const { verifyEmail, user, isAuthenticated, errorsAuth } = useAuth()

  const onVerifyEmail = handleSubmit(async (values) => {
    const success = await verifyEmail(values.emailVerificationCode)

    setValidatingEmail(true);

    if (success.status === 200) {
      setVerificationResult(success.data[0]);
    }

    setValidatingEmail(false);

  })

  useEffect(() => {

    // Todo Aca podriamos redireccionarlo a una pagina de usuario
    if (isAuthenticated && user.emailVerified === true) {
      navigate("/")
    }

  }, [isAuthenticated, user, navigate])

  return (
    <div className="bg-white min-h-screen flex flex-col">

      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <h1 className="text-3xl font-semibold mb-3">Validar Email</h1>
        <p className="text-gray-700 text-sm mb-8">
          Para utilizar la aplicación y realizar reservas, debes verificar tu dirección de correo electrónico. Por favor, introduce el código de verificación aquí.
        </p>

        <form onSubmit={onVerifyEmail} className="w-full max-auto">
          <div className="mb-4">
            {errors.emailVerificationCode && <span className="text-red-500">Este campo es requerido</span>}
            <input
              type="text"
              id="emailVerificationCode"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10"
              placeholder="CÓDIGO DE VERIFICACIÓN"
              {...register("emailVerificationCode", { required: true })} />
          </div>
          <button
            type="submit"
            className="w-4/6 text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1">
            VALIDAR
          </button>
        </form>

        <div>
          {
            errorsAuth.map((error, index) => (
              <div key={index} className="text-red-500">
                {error}
              </div>
            ))
          }
          {/* Mostrar el mensaje de validación mientras se espera la respuesta */}
          {validatingEmail && (
            <div className="mt-4">
              <p>Validando email...</p>
            </div>
          )}

          {/* Mostrar el resultado si existe */}
          {verificationResult && (
            <div className="mt-4">
              <p>{verificationResult}</p>
            </div>
          )}
        </div>



      </div>

    </div>
  )
}

export default ValidateEmail
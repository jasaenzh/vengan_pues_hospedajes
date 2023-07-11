import jwt from 'jsonwebtoken'
import { enviroment } from '../config/config.js'

const { JWT_SECRET } = enviroment

export const authRequired = (req, res, next) => {
  // Primero leo el token
  const { token } = req.cookies;

  console.log("req.cookies", req.cookies)

  console.log("req.headers", req.headers)

  console.log("Token de authRequired", token)

  // Si no hay token, retorno un error
  if (!token) return res.status(401).json(['No autorizado'])


  // Si hay token, verifico que sea válido
  jwt.verify(
    token,
    JWT_SECRET,
    ((err, user) => {
      // Si hay error, retorno un error
      if (err) return res.status(401).json(['Token inválido'])

      // Si no hay error, guardo el usuario en el request
      req.user = user;
      next();
    })
  )
}
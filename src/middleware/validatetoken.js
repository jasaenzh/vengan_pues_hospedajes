import jwt from 'jsonwebtoken'
import { enviroment } from '../config/config.js'

const { JWT_SECRET } = enviroment

export const authRequired = (req, res, next) => {

  const authorization = req.headers.cookie

  console.log("Cookes:", authorization)

  const authorizationHeader = req.headers.authorization;

  console.log("Headers:", authorizationHeader)

  const token = authorizationHeader.split(' ')[1];

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

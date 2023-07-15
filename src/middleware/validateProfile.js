import jwt from 'jsonwebtoken'
import { enviroment } from '../config/config.js'

const { JWT_SECRET } = enviroment

export const authRequiredProfile = (req, res, next) => {

  const cookieHeader = req.headers.cookie;

  const authorizationHeader = req.headers.authorization;

  let token = null;

  if (cookieHeader) {
    const cookies = cookieHeader.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    console.log("Token cookie", tokenCookie)
    if (tokenCookie !== undefined) {
      token = tokenCookie.split('=')[1];
      console.log("Ingreso al if de token cookie", token)
    } else {
      token = authorizationHeader.split(' ')[1];
      console.log("Ingreso al else de token cookie", token)
    }
  }

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
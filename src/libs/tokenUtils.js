// Importo el modulo de jsonwebtoken
import jwt from 'jsonwebtoken';

// Importo la llave secreta
import { enviroment } from '../config/config.js';
const { JWT_SECRET } = enviroment;

export function generateToken(payload) {
  return new Promise((resolve, reject) => {

    // Creo el token
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: '1d'
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    )
  })
}
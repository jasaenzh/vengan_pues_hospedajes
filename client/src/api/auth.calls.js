import axios from './axios';

export const registerRequest = (user) => axios.post(`/register`, user)

export const verifyEmailRequest = (emailVerificationCode) => axios.post(`/verify-email`, { emailVerificationCode })

export const loginRequest = (user) => axios.post(`/login`, user)

export const profileRequest = (token) => axios.get(`/profile`, {
  headers: {
    Authorization: `Bearer ${token}` // Agrega el token de autenticación en los encabezados
  }
});

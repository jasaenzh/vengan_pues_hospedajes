import axios from './axios';

export const registerRequest = (user) => axios.post(`/register`, user)

export const verifyEmailRequest = (emailVerificationCode) => axios.post(`/verify-email`, { emailVerificationCode })

export const loginRequest = (user) => axios.post(`/login`, user, {
  withCredentials: true,
  credentials: "include",
  headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
})

export const profileRequest = () => axios.get(`/profile`)

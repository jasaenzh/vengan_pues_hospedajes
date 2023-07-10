import axios from "./axios"

export const createApartmentRequest = (dataApartment) => axios.post(`/apartments`, dataApartment)

export const getApartmentsRequest = () => axios.get(`/apartments`)


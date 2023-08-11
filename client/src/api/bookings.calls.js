import axios from "./axios"

// export const createBookingRequest = (data,) => axios.post(`/bookings`, data)

export const createBookingRequest = (data, tokenHeader) => {

  return axios.post(`/bookings`, data, {
    headers: {
      Authorization: `Bearer ${tokenHeader}`

    }
  })

}

export const getBookingsByApartmentPublicRequest = (apartmentId) => axios.get(`/bookings/public/apartment/${apartmentId}`)

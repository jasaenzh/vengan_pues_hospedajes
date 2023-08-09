import axios from "./axios"

// export const createBookingRequest = (data,) => axios.post(`/bookings`, data)

export const createBookingRequest = (data, tokenHeader) => {
  console.log("DATA REQUEST", data, tokenHeader)


  return axios.post(`/bookings`, data, {
    headers: {
      Authorization: `Bearer ${tokenHeader}`

    }
  })

}

// export const createBookingRequest = (data, token) => axios.get(`/bookings`, {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });
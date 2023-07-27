import axios from "./axios"

// export const createApartmentRequest = (dataApartment) => axios.post(`/apartments`, dataApartment, {
//   headers: {
//     'Content-Type': 'multipart/form-data' // Agregamos el encabezado correcto para enviar datos de formulario
//   }
// })

export const createApartmentRequest = (dataApartment) => {
  const headers = {
    'Content-Type': 'multipart/form-data' // Configura el encabezado correctamente
  };

  return axios.post(`/apartments`, dataApartment, { headers });
};

export const getApartmentsRequest = () => axios.get(`/apartments`)

export const deleteApartmentRequest = (id) => axios.delete(`/apartments/${id}`)



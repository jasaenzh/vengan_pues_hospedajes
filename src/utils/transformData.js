export async function formatData(data) {

  // console.log("FUNCION PARA TRANSFORMAR DATA", data)

  data.apartmentNumber = data.apartmentNumber.toString();
  data.location = data.location.toString();
  data.squareMeter = parseInt(data.squareMeter);
  data.price = parseInt(data.price);
  data.duplex === 'false' ? data.duplex = false : data.duplex = true;

  // console.log("DATA TRANSFORMADA", data)

  return data;

}
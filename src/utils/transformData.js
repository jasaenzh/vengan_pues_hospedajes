export async function formatData(data) {


  data.apartmentNumber = data.apartmentNumber.toString();
  data.location = data.location.toString();
  data.squareMeter = parseInt(data.squareMeter);
  data.price = parseInt(data.price);
  data.duplex === 'false' ? data.duplex = false : data.duplex = true;

  return data;

}
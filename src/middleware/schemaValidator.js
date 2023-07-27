/** Recibe un Schema y se hace la validacion de los datos de entrada (req.body) */
export const validateSchemaMiddleware = (schema) => (req, res, next) => {

  // console.log("REQ.BODY SCHEMA VALIDATOR", req.body)

  // Parsing de los datos de entrada para evitar errores de tipo
  req.body.apartmentNumber = req.body.apartmentNumber;
  req.body.location = req.body.location;
  req.body.squareMeter = parseInt(req.body.squareMeter);
  req.body.price = parseInt(req.body.price);
  req.body.duplex = req.body.duplex === 'true' ? true : false;
  req.body.bedrooms = parseInt(req.body.bedrooms);
  req.body.doubleBeds = parseInt(req.body.doubleBeds);
  req.body.singleBeds = parseInt(req.body.singleBeds);
  req.body.trundleBed = parseInt(req.body.trundleBed);
  req.body.bathrooms = parseInt(req.body.bathrooms);
  req.body.hotWater = req.body.hotWater === 'true' ? true : false;
  req.body.hairdryer = parseInt(req.body.hairdryer);
  req.body.livingRoom = req.body.livingRoom === 'true' ? true : false;
  req.body.diningRoom = parseInt(req.body.diningRoom);
  req.body.sofaBed = parseInt(req.body.sofaBed);
  req.body.tv = parseInt(req.body.tv);
  req.body.internet = req.body.internet === 'true' ? true : false;
  req.body.kitchen = req.body.kitchen === 'true' ? true : false;
  req.body.fridge = req.body.fridge === 'true' ? true : false;
  req.body.washingMachine = req.body.washingMachine === 'true' ? true : false;
  req.body.microwave = req.body.microwave === 'true' ? true : false;
  req.body.coffeeMaker = req.body.coffeeMaker === 'true' ? true : false;
  req.body.dishwasher = req.body.dishwasher === 'true' ? true : false;
  req.body.breadToaster = req.body.breadToaster === 'true' ? true : false;
  req.body.pressureCooker = req.body.pressureCooker === 'true' ? true : false;
  req.body.riceCooker = req.body.riceCooker === 'true' ? true : false;
  req.body.grill = req.body.grill === 'true' ? true : false;
  req.body.securityCameras = req.body.securityCameras === 'true' ? true : false;
  req.body.terraceWithView = req.body.terraceWithView === 'true' ? true : false;

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // return res.status(400).json(error)
    return res.status(400).json(error.errors.map(err => err.message));
  }
}
import { z } from "zod";

export const createApartmentSchema = z.object({
  apartmentNumber: z.string({
    required_error: "Numero del apartamento es requerido",
  }).refine((value) => value.trim() !== "", {
    message: "El campo no no puede estar vacio"
  }).transform((value) => value.trim()),
  location: z.string({
    required_error: "La Ubicacion es requerida",
  }).transform((value) => value.trim()),
  squareMeter: z.number({
    required_error: "El area del apartamento es requerida",
    invalid_type_error: "El area del apartamento debe ser un numero",
    message: "El area del apartamento debe ser un numero",
    min: 0,
    max: 1000,
  }),
  price: z.number({
    required_error: "El precio del apartamento es requerido",
    invalid_type_error: "El precio del apartamento debe ser un numero",
    message: "El precio del apartamento debe ser un numero",
    min: 0,
    max: 10000000,
  }),
  bedrooms: z.number({
    required_error: "El numero de habitaciones es requerido",
    invalid_type_error: "El numero de habitaciones debe ser un numero",
    message: "El numero de habitaciones debe ser un numero",
    min: 0,
    max: 10,
  }),
  doubleBeds: z.number({
    required_error: "El numero de dobles es requerido",
    invalid_type_error: "El numero de dobles debe ser un numero",
    message: "El numero de dobles debe ser un numero",
    min: 0,
    max: 10,
  }),
  singleBeds: z.number({
    required_error: "El numero de simples es requerido",
    invalid_type_error: "El numero de simples debe ser un numero",
    message: "El numero de simples debe ser un numero",
    min: 0,
    max: 10,
  }),
  trundleBed: z.number({
    required_error: "El numero de trundle es requerido",
    invalid_type_error: "El numero de trundle debe ser un numero",
    message: "El numero de trundle debe ser un numero",
    min: 0,
    max: 10,
  }),
  bathrooms: z.number({
    required_error: "El numero de baños es requerido",
    invalid_type_error: "El numero de baños debe ser un numero",
    message: "El numero de baños debe ser un numero",
    min: 0,
    max: 10,
  }),
  hairdryer: z.number({
    required_error: "El numero de calefaccion es requerido",
    invalid_type_error: "El numero de calefaccion debe ser un numero",
    message: "El numero de calefaccion debe ser un numero",
    min: 0,
    max: 10,
  }),
  diningRoom: z.number({
    required_error: "El numero de cocina es requerido",
    invalid_type_error: "El numero de cocina debe ser un numero",
    message: "El numero de cocina debe ser un numero",
    min: 0,
    max: 10,
  }),
  sofaBed: z.number({
    required_error: "El numero de sofa es requerido",
    invalid_type_error: "El numero de sofa debe ser un numero",
    message: "El numero de sofa debe ser un numero",
    min: 0,
    max: 10,
  }),
  tv: z.number({
    required_error: "El numero de tv es requerido",
    invalid_type_error: "El numero de tv debe ser un numero",
    message: "El numero de tv debe ser un numero",
    min: 0,
    max: 10,
  })
})
import { z } from 'zod';

/** Validacion de Registro de Usuarios */
export const registerUserSchema = z.object({
  username: z.string({
    required_error: "Usuario es requerido"
  }).refine((value) => value.trim() !== "", {
    message: "El usuario no puede estar vacio"
  }),
  email: z.string({
    required_error: "Email es requerido"
  }).email({
    message: "Email no valido"
  }).refine((value) => value.trim() !== "", {
    message: "El email no puede estar vacio"
  }),
  password: z.string({
    required_error: "Contraseña es requerida"
  }).min(6, {
    message: "La contraseña debe tener al menos 6 caracteres"
  }).refine((value) => value.trim() !== "", {
    message: "La contraseña no puede estar vacia"
  }),
  firstName: z.string({
    required_error: "Nombre es requerido"
  }).refine((value) => value.trim() !== "", {
    message: "El nombre no puede estar vacio"
  }),
  lastName: z.string({
    required_error: "Apellido es requerido"
  }).refine((value) => value.trim() !== "", {
    message: "El nombre no puede estar vacio"
  }),
})

/** Validacion de Login de Usuarios  */
export const loginUserSchema = z.object({
  email: z.string({
    required_error: "Email es requerido"
  }).email({
    message: "Email no valido"
  }),
  password: z.string({
    required_error: "Contraseña es requerida"
  }).min(6, {
    message: "La contraseña debe tener al menos 6 caracteres"
  })
})
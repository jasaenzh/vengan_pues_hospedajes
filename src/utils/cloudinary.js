import { v2 as cloudinary } from "cloudinary";

import { enviroment } from '../config/config.js'
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = enviroment

/** Conexion a Cloudinary */
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true
})

/** Subir imagenes a Cloudinary */
export async function uploadImage(filePath) {

  // Metodo para subir imagenes a Cloudinary, le debemos de pasar una ruta
  return await cloudinary.uploader.upload(filePath, {
    folder: 'vengan-pues'
  })

}

/** Eliminar imagenes de Cloudinary */
export async function deleteImage(public_id) {
  return await cloudinary.uploader.destroy(public_id)
}

/** Editar imagenes de Cloudinary */
export async function editImage(public_id, filePath) {
  return await cloudinary.uploader.upload(filePath, {
    public_id,
    overwrite: true
  })

}


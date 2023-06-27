// Importo el modelo Apartment
import Apartment from "../models/Apartment.model.js"
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra"


/** Crear un apartamento  */
export const createApartment = async (req, res) => {

  // Si no existe, guardo el apartamento
  try {

    // Obtener el numero del apartamento del body
    const apartmentNumber = req.body.apartmentNumber;

    // Verifico que el apartamento no exista
    const apartamentExists = await Apartment.findOne({ apartmentNumber });

    // Si existe, devuelvo un error
    if (apartamentExists) {
      return res.status(400).json({ message: "El apartamento ya existe" });
    }

    // Obtengo los datos del body
    const apartmentData = req.body;

    // Obtengo los datos del usuario
    apartmentData.userId = req.user.id;

    // Creo una instancia del modelo Apartment
    const apartment = new Apartment(apartmentData);

    if (req.files?.image) {

      const result = await uploadImage(req.files.image.tempFilePath)

      apartment.images.push({
        secure_url: result.secure_url,
        public_id: result.public_id
      })

      await fs.unlink(req.files.image.tempFilePath)

    }

    // Guardo el apartamento en la base de datos
    const apartamentSaved = await apartment.save()

    // Devuelvo el apartamento guardado
    return res.status(200).json(apartamentSaved)
  } catch (error) {
    return res.status(500).json(error)
  }

}

/** Obtener todos los apartamentos */
export const getApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find();
    if (!apartments) return res.status(404).json({ message: "No hay apartamentos" })
    return res.status(200).json(apartments)
  } catch (error) {
    return res.status(500).json(error)
  }
}

/** Obtener un apartamento por su id */
export const getApartmentById = async (req, res) => {
  const { id } = req.params
  try {
    const getApartmentById = await Apartment.findById(id)
    if (!getApartmentById) return res.status(404).json({ message: "No existe el apartamento" })
    res.status(200).json(getApartmentById)
  } catch (error) {
    res.status(500).json({ message: `Error al obtener el apartamento` || error.message })
  }
}


/** Actualizar un apartamento por su id  */
export const updateApartmentById = async (req, res) => {
  try {

    const { id } = req.params
    const body = req.body

    const apartment = await Apartment.findById(id)
    if (!apartment) return res.status(404).json({ message: "No existe el apartamento" })

    // Verificar si se ha proporcionado una nueva imagen
    if (req.files?.image) {
      const imageIndex = req.body.imageIndex; // Obtener el índice de la imagen a actualizar
      if (imageIndex >= 0 && imageIndex < apartment.images.length) {
        // Eliminar la imagen actual en Cloudinary
        await deleteImage(apartment.images[imageIndex].public_id);

        // Subir la nueva imagen a Cloudinary
        const result = await uploadImage(req.files.image.tempFilePath);

        // Actualizar los datos de la imagen en el array de imágenes
        apartment.images[imageIndex] = {
          secure_url: result.secure_url,
          public_id: result.public_id
        };

        // Guardar el apartamento actualizado en la base de datos
        await apartment.save();
        await fs.unlink(req.files.image.tempFilePath)
      } else {
        return res.status(400).json({ message: "El índice de imagen proporcionado es inválido" });
      }
    }

    const updateApartment = await Apartment.findByIdAndUpdate(id, body, { new: true })
    res.status(200).json(updateApartment)
  } catch (error) {
    return res.status(500).json({ message: `Error al actualizar el apartamento` || error.message })
  }
}

/** Eliminar un apartamento por su id   */
export const deleteApartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteApartment = await Apartment.findByIdAndDelete(id)

    if (!deleteApartment) return res.status(404).json({ message: "No existe el apartamento" })

    if (deleteApartment.images.length > 0) {
      for (const image of deleteApartment.images) {
        await deleteImage(image.public_id);
      }
    }

    return res.status(200).json({ message: 'El apartamento ha sido eliminado correctamente' })
  }
  catch (error) {
    return res.status(500).json({ message: `Error al eliminar el apartamento` || error.message })
  }

}


/** Eliminar una imagen en un apartamento por su id  */
export const deleteImageById = async (req, res) => {
  try {
    const { id, imageIndex } = req.params;

    // Encuentra el apartamento por su id
    const apartment = await Apartment.findById(id);
    if (!apartment) return res.status(404).json({ message: 'No se encontró el apartamento' });

    // Verifica si el índice de la imagen es válido
    if (imageIndex >= 0 && imageIndex < apartment.images.length) {
      const image = apartment.images[imageIndex];

      // Elimina la imagen de Cloudinary
      await deleteImage(image.public_id);

      // Elimina la imagen del array de imágenes del apartamento
      apartment.images.splice(imageIndex, 1);

      // Guarda los cambios en la base de datos
      await apartment.save();

      return res.status(200).json({ message: 'La imagen ha sido eliminada correctamente' });
    } else {
      return res.status(400).json({ message: 'El índice de imagen proporcionado es inválido' });
    }

  } catch (error) {
    return res.status(500).json({ message: `Error al eliminar la imagen: ${error.message}` });
  }


}

/** Agregar una imagen a un apartamento por su id de Apartamento */
// Función para agregar una nueva imagen a un apartamento
export const addImageById = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra el apartamento por su id
    const apartment = await Apartment.findById(id);
    if (!apartment) return res.status(404).json({ message: 'No se encontró el apartamento' });

    // Verifica si se ha proporcionado una nueva imagen
    if (req.files?.image) {
      // Sube la nueva imagen a Cloudinary
      const result = await uploadImage(req.files.image.tempFilePath);

      // Agrega la nueva imagen al array de imágenes del apartamento
      apartment.images.push({
        secure_url: result.secure_url,
        public_id: result.public_id
      });

      await fs.unlink(req.files.image.tempFilePath)

      // Guarda los cambios en la base de datos
      await apartment.save();

      return res.status(200).json({ message: 'La imagen ha sido agregada correctamente' });
    } else {
      return res.status(400).json({ message: 'No se ha proporcionado una imagen' });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error al agregar la imagen: ${error.message}` });
  }
};
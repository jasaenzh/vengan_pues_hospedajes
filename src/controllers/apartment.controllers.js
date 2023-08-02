// Importo el modelo Apartment
import Apartment from "../models/Apartment.model.js"
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra"
import { formatData } from "../utils/transformData.js";

// Función de middleware para verificar los datos de la solicitud antes de la función controladora
export const verifyRequestData = (req, res, next) => {
  console.log('Imagenes cargadas:', req.files); // Imprimir información de las imágenes
  console.log('Otros datos de la solicitud:', req.body); // Imprimir otros datos de la solicitud
  next(); // Llamada a next() para continuar con la ejecución de la función controladora
};


/** Crear un apartamento  */
export const createApartment = async (req, res) => {

  try {

    // Obtener el numero del apartamento del body
    const apartmentNumber = req.body.apartmentNumber;

    // console.log("REQ.FILE ==> ", req.file)
    // console.log("REQ.FILES ==> ", req.files)
    // console.log("REQ.BODY ==> ", req.body)

    // Verifico que el apartamento no exista
    const apartamentExists = await Apartment.findOne({ apartmentNumber });

    // Si existe, devuelvo un error
    if (apartamentExists) {
      return res.status(400).json(["El apartamento ya existe"]);
    }

    // Obtengo los datos del body
    const apartmentData = req.body;

    // Obtengo los datos del usuario
    apartmentData.userId = req.user.id;

    // Creo una instancia del modelo Apartment
    const apartment = new Apartment(apartmentData);

    //Si existe una imagen, la guardo en cloudinary")
    // if (req.file.) { //TODO: Se utiliza si se sube una imagen

    if (req.files) {  //TODO: Se utiliza si se sube varias imagenes

      // console.log("*********************INGRESO AL IF DE REQ.FILES *********************")

      // const result = await uploadImage(req.files.path)

      // apartment.image = {
      //   public_id: result.public_id,
      //   secure_url: result.secure_url
      // }

      // await fs.unlink(req.files.path)

      for (const file of req.files) {
        const result = await uploadImage(file.path);

        apartment.image.push({
          public_id: result.public_id,
          secure_url: result.secure_url,
        });

        fs.unlinkSync(file.path);
      }

    }

    // console.log("========= OBJETO APARTMENT: =========")
    // console.log(apartment)

    // Guardo el apartamento en la base de datos
    const apartamentSaved = await apartment.save()

    //Devuelvo el apartamento guardado
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
    if (!getApartmentById) return res.status(404).json(["No existe el apartamento"])
    res.status(200).json(getApartmentById)
  } catch (error) {
    res.status(500).json([`Error al obtener el apartamento`] || error.message)
  }
}


/** Actualizar un apartamento por su id  */
export const updateApartmentById = async (req, res) => {
  try {

    const { id } = req.params
    const body = req.body

    // console.log(body)
    // console.log("REQ.FILES ACTUALIZAR:", req.files)

    const apartment = await Apartment.findById(id)
    if (!apartment) return res.status(404).json(["No existe el apartamento"])

    // await formatData(body)

    // Vefiricar si se ha enviado una nueva imagen
    if (req.files) {
      console.log("=========== INGRESO AL IF DE REQ:FILES PARA ACTUALIZAR IMAGENES ===========")

      console.log("CANTIDAD DE IMAGENES", apartment.image.length)

      for (const file of req.files) {
        const result = await uploadImage(file.path);

        console.log("RESULTADO DE CLOUDINARY", result)


        if (apartment.image.length > 0) {

          const indexImage = (apartment.image.length - 1) + 1
          console.log("IMAGEN INDEX + 1", indexImage)

          apartment.image[indexImage] = {
            public_id: result.public_id,
            secure_url: result.secure_url,
          }

        } else {
          apartment.image.push({
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        }

        fs.unlinkSync(file.path);
      }

      console.log("LO QUE HAY ACTUALMENTE EN APARTMENT", apartment.image)

    }

    apartment.markModified('image'); // Marca el campo 'image' como modificado para que se actualice en la base de datos

    // Actualiza también otros campos del apartamento utilizando el objeto 'body'
    for (const key in body) {
      apartment[key] = body[key];
    }

    // Guarda el apartamento actualizado en la base de datos
    const updateApartment = await apartment.save();

    console.log("VOY A GUARDAR ESTO", updateApartment);

    return res.status(200).json(updateApartment);

    // console.log("VOY A GUARDAR ESTO", apartment)


    // const updateApartment = await Apartment.findByIdAndUpdate(id, body, { new: true })

    // console.log("RESPUESTA UPDATE", updateApartment)
    // return res.status(200).json(updateApartment)
  } catch (error) {
    return res.status(500).json([`Error al actualizar el apartamento`] || error.message)
  }
}

/** Eliminar un apartamento por su id   */
export const deleteApartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteApartment = await Apartment.findByIdAndDelete(id)

    if (!deleteApartment) return res.status(404).json(["No existe el apartamento"])

    if (deleteApartment.image.length > 0) {
      for (const image of deleteApartment.image) {
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


  const { id, imageIndex } = req.params;

  // console.log(id, imageIndex)

  try {
    const apartment = await Apartment.findById(id);
    // console.log("RESPUESTA APARTAMENTO", apartment)
    if (!apartment) return res.status(404).json(['No se encontró el apartamento']);

    if (imageIndex >= 0 && imageIndex < apartment.image.length) {
      const image = apartment.image[imageIndex];
      // console.log("RESPUESTA IMAGE", image)

      // Elimina la imagen de Cloudinary
      await deleteImage(image.public_id);

      // Elimina la imagen del array de imágenes del apartamento
      apartment.image.splice(imageIndex, 1);

      // Guarda los cambios en la base de datos
      await apartment.save();

    } else {
      return res.status(400).json(['El índice de imagen proporcionado es inválido']);
    }

    return res.status(200).json(['La imagen ha sido eliminada correctamente']);

  } catch (error) {
    return res.status(500).json([`Error al eliminar la imagen: ${error.message}`]);
  }




  // // Verificar si se ha proporcionado una nueva imagen
  // if (req.files?.image) {
  //   const imageIndex = req.body.imageIndex; // Obtener el índice de la imagen a actualizar
  //   if (imageIndex >= 0 && imageIndex < apartment.image.length) {
  //     // Eliminar la imagen actual en Cloudinary
  //     await deleteImage(apartment.image[imageIndex].public_id);

  //     // Subir la nueva imagen a Cloudinary
  //     const result = await uploadImage(req.files.image.tempFilePath);

  //     // Actualizar los datos de la imagen en el array de imágenes
  //     apartment.image[imageIndex] = {
  //       secure_url: result.secure_url,
  //       public_id: result.public_id
  //     };

  //     // Guardar el apartamento actualizado en la base de datos
  //     await apartment.save();
  //     await fs.unlink(req.files.image.tempFilePath)
  //   } else {
  //     return res.status(400).json(["El índice de imagen proporcionado es inválido"]);
  //   }
  // }

  // ###############################################################

  // const apartment = await Apartment.findById(id);

  // try {
  //   const { id, imageIndex } = req.params;



  //   // Encuentra el apartamento por su id
  //   const apartment = await Apartment.findById(id);
  //   if (!apartment) return res.status(404).json(['No se encontró el apartamento']);

  //   // Verifica si el índice de la imagen es válido
  //   if (imageIndex >= 0 && imageIndex < apartment.image.length) {
  //     const image = apartment.image[imageIndex];

  //     // Elimina la imagen de Cloudinary
  //     await deleteImage(image.public_id);

  //     // Elimina la imagen del array de imágenes del apartamento
  //     apartment.image.splice(imageIndex, 1);

  //     // Guarda los cambios en la base de datos
  //     await apartment.save();

  //     return res.status(200).json(['La imagen ha sido eliminada correctamente']);
  //   } else {
  //     return res.status(400).json(['El índice de imagen proporcionado es inválido']);
  //   }

  // } catch (error) {
  //   return res.status(500).json({ message: `Error al eliminar la imagen: ${error.message}` });
  // }



}

/** Agregar una imagen a un apartamento por su id de Apartamento */
// Función para agregar una nueva imagen a un apartamento
export const addImageById = async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra el apartamento por su id
    const apartment = await Apartment.findById(id);
    if (!apartment) return res.status(404).json(['No se encontró el apartamento']);

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
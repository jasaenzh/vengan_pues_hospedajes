import sharp from 'sharp'

// export const helperImg = (filePath, fileName, higth = 470, width = 470) => {

//   const fileOptimize = sharp(filePath)
//     .resize(width, higth)
//     .toFile(`./assets/optimize/${fileName}`)

//   return fileOptimize

// }

export const helperImg = async (filePath, fileName, higth = 300, width = 300) => {
  try {
    const fileOptimize = await sharp(filePath)
      .resize(width, higth)
      .toFile(`./assets/optimize/${fileName}`);

    return {
      result: fileOptimize,
      path: `./assets/optimize/${fileName}`,
    };
  } catch (error) {
    // Manejo de errores si es necesario
    throw new Error('Error al optimizar la imagen');
  }
};
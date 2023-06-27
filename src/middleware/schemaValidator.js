/** Recibe un Schema y se hace la validacion de los datos de entrada (req.body) */
export const validateSchemaMiddleware = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // return res.status(400).json(error)
    return res.status(400).json(error.errors.map(err => err.message));
  }
}
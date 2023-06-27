import { enviroment } from "./config/config.js";
import app from "./app.js";
import { connectDB } from "./db.js";

const { PORT_SERVER } = enviroment;

const PORT_SECUNDARY = 4001

const PORT = PORT_SERVER || PORT_SECUNDARY;

/** Conecto a la base de datos y luego inicio el servidor */
connectDB()
  .then(() => {
    try {
      app.listen(PORT)
      console.log(`Servidor escuchando en el puerto ${PORT}`)
    } catch (error) {
      console.log(error)
    }
  })


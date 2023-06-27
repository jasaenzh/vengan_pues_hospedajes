import mongoose from "mongoose";
import { enviroment } from "./config/config.js";

/** Variables de conexion a la base de datos  */
const { MONGO_URI } = enviroment;
const nameMongoBDLocal = "prueba";

const db = MONGO_URI || `mongodb://localhost/${nameMongoBDLocal}`;

/** Opciones de conexion a la base de datos */
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db, options);
    console.log(`Conectado a la base de datos ${conn.connection.name} correctamente`)
    return conn;
  } catch (error) {
    console.log(error)
  }
}
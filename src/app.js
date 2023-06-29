import express from "express";
import morgan from "morgan";
import indexRouter from "./routes/index.routes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

// Middlewares
app.use(cors({
  origin: [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
  ],
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


// Ruta principal
app.use("/api", indexRouter)

export default app;
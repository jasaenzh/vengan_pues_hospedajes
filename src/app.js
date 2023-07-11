import express from "express";
import morgan from "morgan";
import indexRouter from "./routes/index.routes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

app.use(cookieParser());

// Middlewares
app.use(cors({
  origin: [
    'https://vengan-pues-hospedajes.vercel.app',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan("dev"));
app.use(express.json());


// Ruta principal
app.use("/api", indexRouter)

export default app;
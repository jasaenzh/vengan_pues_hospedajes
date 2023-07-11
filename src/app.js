import express from "express";
import morgan from "morgan";
import indexRouter from "./routes/index.routes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

// Middlewares
app.use(cors({
  origin: [
    'https://vengan-pues-hospedajes.vercel.app',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());


// Ruta principal
app.use("/api", indexRouter)

export default app;
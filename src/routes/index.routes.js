import { Router } from "express";
import userRoutes from "./auth.routes.js";
import apartmentRoutes from "./apartment.routes.js";
import bookingRoutes from "./booking.routes.js"

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
})

router.use(userRoutes);
router.use('/apartments', apartmentRoutes);
router.use('/bookings', bookingRoutes);


export default router
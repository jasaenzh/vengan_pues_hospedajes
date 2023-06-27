import { Router } from 'express';
import {
  createBooking,
  getAllBookingsPublic,
  getBookingByIdPublic,
  getAllBookings,
  getBookingById,
  getBookingsByApartmentPublic,
  cancelBooking,
  confirmBooking
} from '../controllers/booking.controllers.js';
import { authRequired } from '../middleware/validatetoken.js';
import { adminProfile } from '../middleware/adminProfile.js';

const router = Router();


/** Metodos post */
router.post("/", authRequired, createBooking)

/** Metodos get Publicos */
router.get("/", authRequired, getAllBookings)
router.get("/public", getAllBookingsPublic)
router.get("/:id", authRequired, getBookingById)
router.get("/public/:id", getBookingByIdPublic)
router.get("/public/apartment/:id", getBookingsByApartmentPublic)

/** Metodos get privados */
router.get("/:id", authRequired)


/** Metodos put */
router.put("/:id", authRequired, createBooking)
router.put("/cancel-booking/:reservationCode", authRequired, cancelBooking)
router.put("/confirm-reservation/:reservationCode", authRequired, adminProfile, confirmBooking)


/** Metodos delete */


export default router;
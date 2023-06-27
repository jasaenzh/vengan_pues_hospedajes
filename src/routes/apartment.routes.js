import { Router } from "express";
import { getApartments, createApartment, getApartmentById, updateApartmentById, deleteApartmentById, deleteImageById, addImageById } from "../controllers/apartment.controllers.js";
import { adminProfile } from "../middleware/adminProfile.js";
import { authRequired } from "../middleware/validatetoken.js";
import { editProfile } from "../middleware/editProfile.js";
import { fileUploadMiddleware } from "../middleware/fileUploadCloudinary.js";
import { validateSchemaMiddleware } from "../middleware/schemaValidator.js";
import { createApartmentSchema } from "../schemas/apartment.schemas.js";

const router = Router();

/** Metodos post */
router.post("/", validateSchemaMiddleware(createApartmentSchema), authRequired, adminProfile, fileUploadMiddleware, createApartment)
router.post("/:id/images", fileUploadMiddleware, authRequired, adminProfile, addImageById)

/** Metodos get */
router.get("/", getApartments)
router.get("/:id", getApartmentById)

/** Metodos put */
router.put("/:id", fileUploadMiddleware, authRequired, editProfile, updateApartmentById)


/** Metodos delete */
router.delete("/:id/images/:imageIndex", authRequired, adminProfile, deleteImageById)
router.delete("/:id", authRequired, adminProfile, deleteApartmentById)


export default router;
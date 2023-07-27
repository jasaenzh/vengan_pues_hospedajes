import { Router } from "express";
import { getApartments, createApartment, getApartmentById, updateApartmentById, deleteApartmentById, deleteImageById, addImageById, verifyRequestData } from "../controllers/apartment.controllers.js";
import { adminProfile } from "../middleware/adminProfile.js";
import { authRequired } from "../middleware/validatetoken.js";
import { editProfile } from "../middleware/editProfile.js";
import { validateSchemaMiddleware } from "../middleware/schemaValidator.js";
import { createApartmentSchema } from "../schemas/apartment.schemas.js";
import { authRequiredProfile } from "../middleware/validateProfile.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = Router();

/** Metodos post */
router.post("/", upload.any('image'), verifyRequestData, validateSchemaMiddleware(createApartmentSchema), authRequired, createApartment)

router.post("/:id/images", upload.any('image'), authRequired, adminProfile, addImageById)

/** Metodos get */
router.get("/", getApartments)
router.get("/:id", getApartmentById)

/** Metodos put */
router.put("/:id", upload.any('image'), authRequired, editProfile, updateApartmentById)


/** Metodos delete */
router.delete("/:id/images/:imageIndex", authRequired, adminProfile, deleteImageById)
router.delete("/:id", authRequired, adminProfile, deleteApartmentById)


export default router;

// Subir una foto en cloudinary
//router.post("/", upload.single('image'), validateSchemaMiddleware(createApartmentSchema), authRequired, createApartment)

// Otras rutas
// router.post("/", upload.single('image'), validateSchemaMiddleware(createApartmentSchema), authRequiredProfile, adminProfile, createApartment)
// router.post("/", upload.single('image'), uploadImageMulter)
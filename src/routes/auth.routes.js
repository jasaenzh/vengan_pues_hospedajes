import { Router } from "express";
import { registerUser, loginUser, verifyUser, profileUser, logoutUser, updateUser, resetPassword, changePassword } from "../controllers/auth.controller.js"
import { authRequired } from "../middleware/validatetoken.js";
import { validateSchemaMiddleware } from "../middleware/schemaValidator.js";
import { loginUserSchema, registerUserSchema } from "../schemas/auth.schemas.js";
import { authRequiredProfile } from "../middleware/validateProfile.js";

const router = Router();

/** Metodos post */
router.post("/register", validateSchemaMiddleware(registerUserSchema), registerUser)
router.post("/login", validateSchemaMiddleware(loginUserSchema), loginUser)
router.post('/logout', logoutUser)
router.post('/reset-password', resetPassword)
router.post("/verify-email", verifyUser)

/** Metodos get */
router.get('/profile', authRequired, profileUser)
// router.get('/profile', authRequiredProfile, profileUser)

/** Metodos put */
router.put('/update', authRequired, updateUser)
router.put('/change-password', changePassword)


export default router
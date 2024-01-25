import { Router } from "express";
import {
    displayUserByEmail,
    registerUser,
} from "../../src/api/v1/controllers/registerController.js";
import { validateRegister } from "../../middlewares/validateRegister.js";

const router = Router();

// POST register new user
router
    .route("/users")
    .post(validateRegister, registerUser)
    .get(displayUserByEmail)
    .all(function (req, res, next) {
        res.status(405).json({ message: "method not allowed" });
    });

export default router;

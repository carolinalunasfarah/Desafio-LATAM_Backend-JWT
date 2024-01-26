import { Router } from "express";
import {
    displayUserByEmail,
    registerUser,
} from "../../src/api/v1/controllers/registerController.js";
import { validateRegister } from "../../middlewares/validateRegister.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const router = Router();

// POST register new user and GET by email
router
    .route("/users")
    .post(validateRegister, registerUser)
    .get(verifyToken, displayUserByEmail)
    .all(function (req, res, next) {
        res.status(405).json({ message: "method not allowed" });
    });

export default router;

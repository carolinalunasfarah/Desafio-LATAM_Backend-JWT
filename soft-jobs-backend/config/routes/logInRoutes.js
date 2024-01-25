import { Router } from "express";
import { userLogIn } from "../../src/api/v1/controllers/logInController.js";
// import { validateLogIn } from "../../middlewares/validateLogIn.js";

const router = Router();

// POST user login
router
    .route("/login")
    .post(userLogIn)
    .all(function (req, res, next) {
        res.status(405).json({ message: "method not allowed" });
    });

export default router;

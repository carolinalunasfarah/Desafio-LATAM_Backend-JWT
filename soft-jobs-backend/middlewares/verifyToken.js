import "dotenv/config";
import jwt from "jsonwebtoken";
import { errorFinder } from "../src/api/v1/utils/utils.js";

export const verifyToken = async (req, res, next) => {
    try {
        verifyHeader(req, res);
        const token = req.header("Authorization").split(" ")[1];
        const tokenData = await validateToken(token);
        req.user = tokenData;
        next();
    } catch (error) {
        throw new Error("Error verifying token: " + error.message);
    }
};

const validateToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        const errorFound = errorFinder("auth_03");
        return res
            .status(errorFound[0].status)
            .json({ error: errorFound[0].message });
    }
};

const verifyHeader = (req) => {
    if (!req.header("Authorization")) {
        const errorFound = errorFinder("auth_04");
        return res
            .status(errorFound[0].status)
            .json({ error: errorFound[0].message });
    }
};

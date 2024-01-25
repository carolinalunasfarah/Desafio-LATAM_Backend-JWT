import { errorFinder } from "../src/api/v1/utils/utils";
import jwt from "jsonwebtoken";

export const isLogin = async (req, res, next) => {
    try {
        validateHeaders(req, res);
        const token = req.header("Authorization").split(" ")[1];
        const tokenData = await validateToken(token);
        req.user = tokenData;
        next();
    } catch (error) {
        console.log(error);
        const errorFound = errorFinder(error.code);
        return res
            .status(errorFound[0]?.status)
            .json({ error: errorFound[0]?.message });
    }
};

const validateToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token: " + error.message);
    }
};

const validateHeaders = (req) => {
    if (!req.header("Authorization")) {
        throw new Error("Token not found: " + error.message);
    }
};

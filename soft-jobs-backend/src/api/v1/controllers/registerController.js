import { createUser, displayUser } from "../models/registerModel.js";
import { errorFinder } from "../utils/utils.js";

export const registerUser = async (req, res) => {
    try {
        const { email, password, role, lenguage } = req.body;
        await createUser(email, password, role, lenguage);
        res.status(201).json("User created successfully");
    } catch (error) {
        console.log(error);
        const errorFound = errorFinder(error.code);
        return res
            .status(errorFound[0]?.status)
            .json({ error: errorFound[0]?.message });
    }
};

export const displayUserByEmail = async (req, res) => {
    try {
        const { email } = req.user;
        const findUser = await displayUser(email);
        res.status(200).json([findUser]);
    } catch (error) {
        console.log(error);
        const errorFound = errorFinder(error.code);
        return res
            .status(errorFound[0]?.status)
            .json({ error: errorFound[0]?.message });
    }
};

import { displayUser } from "../models/registerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorFinder } from "../utils/utils.js";

export const userLogIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await displayUser(email);
        if (!user) {
            const errorFound = errorFinder("auth_01");
            return res
                .status(errorFound[0].status)
                .json({ error: errorFound[0].message });
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            const errorFound = errorFinder("auth_02");
            return res
                .status(errorFound[0].status)
                .json({ error: errorFound[0].message });
        }
        const { email } = user;
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "3h",
        });
        res.status(200).json({
            message: `Welcome ${email}, you have successfully log in`,
            code: 200,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

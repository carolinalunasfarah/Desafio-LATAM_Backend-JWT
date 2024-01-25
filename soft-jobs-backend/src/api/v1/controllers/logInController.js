import { displayUser } from "../models/registerModel.js";
import { errorFinder } from "../utils/utils.js";
import bcrypt from "bcryptjs";

export const userLogIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await displayUser(email);
        if (!user) {
            const errorFound = errorFinder("auth_01");
            return res
                .status(errorFound[0].status)
                .json({ error: errorFound[0].message });
        } else {
            const passwordMatch = bcrypt.compareSync(password, user.password);
            if (!passwordMatch) {
                const errorFound = errorFinder("auth_02");
                return res
                    .status(errorFound[0].status)
                    .json({ error: errorFound[0].message });
            } else {
                const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                    expiresIn: "3h",
                });
                console.log("Login successful for user:", email);
                res.status(200).json({
                    message: `Welcome ${email}, you have successfully logged in`,
                    code: 200,
                    token,
                });
            }
        }
    } catch (error) {
        console.error("Error in userLogIn:", error);
        res.status(500).json({ error: error.message });
    }
};

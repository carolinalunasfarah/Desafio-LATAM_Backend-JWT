export const validateRegister = (req, res, next) => {
    const { email, password, role, lenguage } = req.body;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
        return res
            .status(400)
            .json({ message: "You need to enter a valid email" });
    }
    const passwordRegex = /^.{4,}$/;
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({
            message: "The password must be at least 4 characters long",
        });
    } else if (!role || !lenguage) {
        return res.status(400).json({
            message: "You need to choose a role and a lenguage",
        });
    }
    next();
};

export const validateRegister = (req, res, next) => {
    const { email, password, role, lenguage } = req.body;
    if (!email || !password || !role || !lenguage) {
        return res.status(400).json({ message: "You need to enter all data" });
    }
    next();
};

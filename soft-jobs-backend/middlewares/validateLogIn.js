export const validateLogIn = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields required",
        });
    }
    next();
};

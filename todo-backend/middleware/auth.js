const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const token = req.header("x-auth-token");
    console.log('Auth middleware token:', token);

    if (!token)
        return res.status(401).send("Access denied");

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log('Auth decoded:', decoded);
        req.user = decoded;

        next();
    }
    catch (err) {
        console.error('Auth error:', err);
        res.status(400).send("Invalid token");
    }
};
require("dotenv").config();

function adminAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    const encoded = authHeader.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString();

    const username = decoded.split(":")[0];
    const password = decoded.split(":")[1];

    if (
        username === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASS
    ) {
        return next();
    }

    return res.status(403).json({
        message: "Invalid credentials"
    });
}

module.exports = adminAuth;
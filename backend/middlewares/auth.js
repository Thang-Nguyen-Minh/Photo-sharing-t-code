const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            req.user = decoded;
            next(); // ✅ CHỈ GỌI NEXT NẾU TOKEN OK
        });
    } else {
        return res.status(400).json({ message: "Token missing or malformed" });
    }
};

module.exports = verifyToken;

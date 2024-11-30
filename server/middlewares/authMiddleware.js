const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token
   

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, "My_Secret_key");
        console.log(decoded.data);
        req.user = decoded.data; // Assuming payload contains user data
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}


module.exports = {
    auth
}
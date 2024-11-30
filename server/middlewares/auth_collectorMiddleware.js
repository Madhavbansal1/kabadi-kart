const jwt = require("jsonwebtoken");

const Collector_auth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token
    console.log("token is :"+ token);
    console.log("2");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, "My_Secret_key");
        console.log("decoded data: "+ decoded.data);
        req.user = decoded.data; // Assuming payload contains user data
        console.log(req.user);
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}


module.exports = {
    Collector_auth
}
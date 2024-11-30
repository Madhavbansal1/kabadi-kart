const jwt = require('jsonwebtoken');
const userSchema = require("../models/User");

const validAccesstoken = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token is required"
            });
        }

        // Find the user with the token
        const user = await userSchema.findOne({
            "tokens.accessToken.token": token
        });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // Check if token is expired
        const expireAt = user.tokens?.accessToken?.expireAt;
        if (!expireAt || new Date(expireAt) < new Date()) {
            // If token expired, try to use the refresh token to generate a new access token
            const refreshToken = req.headers['x-refresh-token'];  // Assuming refresh token is passed in a custom header
            if (!refreshToken) {
                return res.status(401).json({
                    status: false,
                    message: "Refresh token is required"
                });
            }

            // Verify refresh token (make sure it's valid)
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        status: false,
                        message: "Invalid refresh token"
                    });
                }

                // Regenerate access token if refresh token is valid
                const newAccessToken = jwt.sign(
                    { userId: user._id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }  // Set the expiration time for the new access token
                );

                // Update access token and expiration in the database
                user.tokens.accessToken.token = newAccessToken;
                user.tokens.accessToken.expireAt = new Date(Date.now() + 15 * 24 *  60 * 60 * 1000);  // Setting expiry to 15 days from now
                await user.save();

                // Attach the user and the new access token to the request
                req.user = user;
                req.newAccessToken = newAccessToken;

                // Proceed with the request
                next();
            });
        } else {
            // If the token is valid, proceed with the request
            req.user = user;
            next();
        }
    } catch (err) {
        console.error("Error in token validation:", err);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    validAccesstoken
};

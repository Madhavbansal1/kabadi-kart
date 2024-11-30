const mongoose = require("mongoose");


const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        accessToken:{
            token: String,
            expireAt: Date
        },
        refreshToken:{
            token: String,
            expireAt: Date
        }
    }
    
},
{
    timestamps: true
}
)

const userSchema = mongoose.model("User", Schema);

module.exports = userSchema;
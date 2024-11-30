const bcrypt = require("bcrypt");
const collectorSchema = require("../models/Collector");
const jwt = require("jsonwebtoken");
const SecretKey = "My_Secret_key";
const generateToken = (data, exp) => {
    if (!exp) {
        exp = (Date.now() / 1000) + 24 * 60 * 60;
    }
    const token = jwt.sign(
        {
            exp,
            data
        },
        SecretKey
    );
    return token;
}

const decodeToken = (token) => {
    let data;
    try {
        data = jwt.verify(token, SecretKey);
    } catch (error) {
        console.log(error);
    }

    return data;
}

const generateNewAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(200).json({
            status: false,
            message: "refreshToken is required"
        });
        return;
    }

    const user = await collectorSchema.findOne({
        "tokens.refreshToken.token": refreshToken,
    });
    if(!user){
        res.status(422).json({
            status: false,
            message: "User not found"
        });
        return;
    }

    const aToken = generateToken({
        email:user.email,
        name: user.name
    }, (Date.now() / 1000) + 60 * 60 * 24);

    user.tokens.accessToken = {
        token: aToken,
        expireAt: new Date((Date.now() / 1000) + 60 * 60 * 24)
    }

    await user.save().then((User) => {
        res.status(200).json({
            status: true,
            message: "AccessToken Created Successfully",
            data: User
        })
    }).catch((e) => {
        res.status(500).json({
            status: false,
            message: "Error while creating AccessToken",
            error: e
        })
    })
}

const validEmail = async (email) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(email);
}

const SignUpUser = async (req, res) => {
    const { name, email, password, phone, location, serviceAreas,availability } = req.body;

    // Validate required fields
    if (!name || !email || !password || !location || !serviceAreas || !phone ) {
        return res.status(400).json({
            status: false,
            message: "All fields are required",
        });
    }

    // Validate email format
    if (!validEmail(email)) {
        return res.status(400).json({
            status: false,
            message: "Email is not valid",
        });
    }

    try {
        // Check if the user already exists
        const existingUser = await collectorSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                status: false,
                message: "User already exists with this email",
            });
        }

        // Hash password
        const bcryptPassword = await bcrypt.hash(password, 10);

        // Generate access and refresh tokens
        const aToken = generateToken(
            { email, name },
            (Date.now() / 1000) + 60 * 60 * 24 // 1 day
        );
        const rToken = generateToken(
            { email, name },
            (Date.now() / 1000) + 20 * 60 * 60 * 24 // 20 days
        );

        // Create new user document
        const newUser = new collectorSchema({
            name,
            email,
            password: bcryptPassword,
            phone,
            availability,
            serviceAreas,
            location,
            tokens: {
                accessToken: {
                    token: aToken,
                    expireAt: new Date(((Date.now() / 1000) + 60 * 60 * 24 * 3) * 1000),
                },
                refreshToken: {
                    token: rToken,
                    expireAt: new Date(((Date.now() / 1000) + 20 * 60 * 60 * 24) * 1000),
                },
            },
        });

        // Save user to database
        await newUser.save();
        return res.status(201).json({
            status: true,
            message: "User created successfully",
            data: newUser,
        });
    } catch (error) {
        console.error("Error during user signup:", error);
        return res.status(500).json({
            status: false,
            message: "Error while creating user",
            error,
        });
    }
};

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(200).json({
            status: false,
            message: "All field are required"
        });
        return;
    }
    if (!validEmail(email)) {
        res.status(200).json({
            status: false,
            message: "Email is not Valid"
        });
        return;
    }

    const user = await collectorSchema.findOne({ email });

    if (!user) {
        res.status(422).json({
            status: false,
            message: "User not found"
        });
        return;
    }

    const dbPassword = user.password;
    const comparison = await bcrypt.compare(password, dbPassword);

    if (!comparison) {
        res.status(422).json({
            status: false,
            message: "password is incorrect"
        });
        return;
    }

    res.status(200).json({
        status: true,
        message: "Login Successfully",
        data: user
    })
}

const profile = async (req, res) => {
    try {
        // Correcting the query to use an object as the first parameter
        const user = await collectorSchema.findOne({ email: req.user.email }).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};




module.exports = {
    profile,
    SignUpUser,
    LoginUser,
    generateNewAccessToken
}
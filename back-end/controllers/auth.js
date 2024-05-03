const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);
const JWT_KEY = process.env.JWT_KEY;
const sessionValidation = require("../middlewares/session");

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body

        let foundUser = await User.findOne({ userName })

        if (!foundUser) throw Error("User not found");

        const verifyPassword = await bcrypt.compare(password, foundUser.password)

        if (!verifyPassword) throw Error("Incorrect Password")

        const token = jwt.sign(
            { _id: foundUser._id, isAdmin: foundUser.isAdmin }, 
            JWT_KEY,
            { expiresIn: 60 * 60 * 24 * 365 }
        )

        res.status(200).json({
            message: `Logged in`,
            foundUser,
            token
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.post("/signup", async (req, res) => {
    console.log('route hit')
    try {
        const { userName, firstName, lastName, email, password } = req.body;

        if (!userName || !firstName || !lastName || !email || !password) throw Error("Please fill out all inputs");

        const newUser = new User({ userName, firstName, lastName, email, password: bcrypt.hashSync(password, SALT) });

        await newUser.save()

        const token = jwt.sign(
            {_id: newUser._id },
            JWT_KEY,
            { expiresIn: 60 * 60 * 24 * 365 }
        )

        res.status(201).json({
            message: `User Created`,
            newUser,
            token
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;
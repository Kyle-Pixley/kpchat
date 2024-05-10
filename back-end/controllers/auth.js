const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);
const JWT_KEY = process.env.JWT_KEY;
const sessionValidation = require("../middlewares/session");

router.post('/login', async (req, res) => {
    console.log('login route hit')
    try {
        const { userName, password } = req.body

        let foundUser = await User.findOne({ userName })

        if (!foundUser) {
            console.error(`Login attempt failed: User not found for userName: ${userName}`);
            throw new Error("Authentication failed");
        }

        const verifyPassword = await bcrypt.compare(password, foundUser.password)
        if (!verifyPassword) {
            console.error(`Login attempt failed: Incorrect password for userName ${userName}`);
            throw new Error("Authentication failed");
        }

        const token = jwt.sign(
            { _id: foundUser._id, isAdmin: foundUser.isAdmin }, 
            JWT_KEY,
            { expiresIn: 60 * 60 * 24 * 365 }
        )

        res.status(200).json({
            message: `Logged in`,
            // foundUser,
            token
        })
    } catch (err) {
        console.error(`Login error: ${err.message}`);
        res.status(500).json({
            message: "Internal server error"
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

router.put("/update/:id", sessionValidation, async (req, res) => {
    try {
        if (!req.user) throw Error("User is not logged in");
        if (!req.user.isAdmin) throw Error("User does not have permission");

        const { id: _id } = req.params
        const updatedUser = req.body

        const updateUser = await User.updateOne({ _id }, { $set:updatedUser })

        if (updateUser.matchedCount === 0) throw Error("ID not found")

        res.status(200).json({
            message: `User Updated`,
            updateUser
        })
    } catch(err) {
        res.status(500).json({
            message: err
        })
    }
});

router.delete("/delete/:id", sessionValidation, async (req, res) => {
    try {
        if (!req.user) throw Error("User is not logged in");
        if (!req.user.isAdmin) throw Error("User does not have permission");

        const { id: _id } = req.params
        
        const deleteOne = await User.findByIdAndDelete({ _id });

        if (!deleteOne) throw Error("User not found");

        res.status(200).json({
            message: `Account Deleted`,
            deleteOne
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
});

module.exports = router;
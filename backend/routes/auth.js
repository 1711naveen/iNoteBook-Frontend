const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = "NAVEEN@123";

//Route:1
//Create a user using post "/api/auth", No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    const result = validationResult(req);
    let success = false;
    if (!result.isEmpty()) {
        return res.status(404).json({ success: success, result: result.array() });
        // res.send({ errors: result.array() });
    }

    try {
        //check whether with the email exist already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success: success, error: "sorry already a user with this email exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        console.log(authToken);

        res.json({ success, authToken });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(200).json({ success: success, error: 'Email id alraedy exist' })
        }
        console.log(error)
        res.status(500).json({ success: success, error: 'server error' });
    }
})


//Route:2
//Authenticate a user using post '/api/auth/login'. No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const result = validationResult(req);
    let success = false;
    if (!result.isEmpty()) {
        return res.status(404).json({ success: success, result: result.array() });
        // res.send({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: success, error: "Try to login with correct credential" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success: success, error: "Try to login with correct credential" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: success, error: 'Internal server error' });
    }
})



//Route:3
//Get logedin user detail '/api/auth/getuser'. login required

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        let userID = req.user.id
        const user = await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
})




module.exports = router
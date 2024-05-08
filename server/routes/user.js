import express from 'express'
import bcrypt from "bcrypt"
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { GoogleGenerativeAI } from '@google/generative-ai'


const router = express.Router();
//Signup Code
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return res.json({ message: "user already exist" })
    }
    const hashpass = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashpass,
    })

    await newUser.save()
    return res.json({ status: true, message: "record save" })

})
//login Code
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        console.log('no such user')
        return res.json({ message: "user is not registered" })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.json({ message: "Password not right" })
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '5m' });
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
res.cookie('token', token, { httpOnly: true, maxAge: oneDayInMilliseconds });

    
    return res.json({ status: true, message: 'login sucessful' })


})
//forget password code
router.post('/forgot', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            console.log('no such user')
            return res.json({ message: "user is not registered" })
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '35m' })
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bsef20m519@pucit.edu.pk',
                pass: 'bqzqeshsikhlbioy'
            }
        });

        var mailOptions = {
            from: 'bsef20m519@pucit.edu.pk',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPaswword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: 'email not sent ,err' });
            } else {
                { }
                return res.json({ status: true, message: 'email sent' });
            }
        });

    }
    catch (err) {
        console.log(err)

    }




})

//reset -code
router.post('/resetPassword/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashpass = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({ _id: id }, { password: hashpass })

        return res.json({ status: true, message: "new pass save" })
    } catch (err) {
        return res.json({ status: true, message: "invalid token" })
    }


})

//protected routes
//function  for check auth
const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {

            return res.json({ status: false, message: "no token" });
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next()

    }
    catch (err) {
        console.log(err)
        return res.json(err)
    }

}

router.get('/verify', verifyUser, (req, res) => {
    return res.json({ status: true, message: "valid user" });
});

//handle logout
router.get("/logout", (req, res) => {
    res.clearCookie('token')
    return res.json({ status: true, message: "logout sucessfull" })
})


//Add a new route for analyzing user queries
// Add a new route for analyzing user queries
// router.post('/analyze', verifyUser, async (req, res) => {
//     const { foodItem1, foodItem2 } = req.body;

//     try {
//         // Perform analysis on user queries
//         const { analysisResult, food1, food2 } = await performAnalysis(foodItem1, foodItem2);

//         // Save user query and analysis result to your database
//         const userQuery = new UserQuery({
//             userId: req.user._id, // Assuming you have authentication middleware to get user information
//             foodItem1,
//             foodItem2,
//             analysisResult
//         });
//         await userQuery.save();
//         console.log(UserQuery)
//         // Send analysis result and food data back to the frontend
//         return res.json({ status: true, message: "User query analyzed successfully", analysisResult, food1, food2 });
//     } catch (error) {
//         console.error("Error analyzing user query:", error);
//         return res.status(500).json({ status: false, message: "Internal server error" });
//     }
// });









export { router as UserRouter }
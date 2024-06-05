import express from 'express'
import bcrypt from "bcrypt"
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'




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

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.KEY, { expiresIn: '60m' });
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
res.cookie('token', token, { httpOnly: true, maxAge: oneDayInMilliseconds });

    
    return res.json({ status: true, message: 'login sucessful' })


})
//forget password code
router.post('/forgot', async (req, res) => {
    const { email } = req.body;
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
                pass: 'whrfevrxfkawpuvk'
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
                console.log(error)
                return res.json({ message: 'email not sent ,err' });
            } else {
                
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
// Function for checking auth
const verifyUser = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json({ status: false, message: "no token" });
      }
      const decoded = await jwt.verify(token, process.env.KEY);
      req.userId = decoded.userId; // Set userId in the request object
      next();
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  };
  
router.get('/verify', verifyUser, (req, res) => {
    return res.json({ status: true, message: "valid user" });
});

//handle logout
router.get("/logout", (req, res) => {
    res.clearCookie('token')
    return res.json({ status: true, message: "logout sucessfull" })
})

router.get('/userInfo', verifyUser, async (req, res) => {
    try {
      const userId = req.userId; // Assuming you set userId in the verification middleware
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ userInfo: { username: user.username, email: user.email } });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  // Add the update profile route to your existing router
  router.put('/updateProfile', verifyUser, async (req, res) => {
    try {
      const userId = req.userId; // Assuming you set userId in the verification middleware
      const { username, password } = req.body;
  
      // Hash the password if it is being updated
      const updateFields = { username };
      if (password) {
        updateFields.password = await bcrypt.hash(password, 10);
      }
  
      // Update the user's information
      await User.findByIdAndUpdate(userId, updateFields);
  
      res.json({ status: true, message: 'Profile updated successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
export { router as UserRouter }
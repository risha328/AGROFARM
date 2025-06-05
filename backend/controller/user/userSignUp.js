/*const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req,res){
    try{
        const { email, password, name} = req.body

        const user = await userModel.findOne({email})

        //console.log("user",user)

        if(user){
            throw new Error("Already user exits.")
        }

        if(!email){
           throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })


    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController*/


const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Configure your email transporter (put this outside the function)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USERNAME, // your email
    pass: process.env.EMAIL_PASSWORD  // your email password or app password
  }
});

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        const user = await userModel.findOne({ email });

        //console.log("user", user);

        if (user) {
            throw new Error("User already exists.");
        }

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if (!name) {
            throw new Error("Please provide name");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong with password hashing");
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Welcome to AGROFARM!',
            html: `
               <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Community</title>
    <style>
        /* Base Styles */
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: green;
            margin: 0;
            padding: 0;
            background-color: green;
        }
        
        /* Container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, green, green);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
        
        /* Content */
        .content {
            padding: 30px;
        }
        
        h1 {
            color: #1e293b;
            margin-top: 0;
            font-size: 24px;
        }
        
        p {
            margin-bottom: 20px;
            font-size: 16px;
        }
        
        .highlight-box {
            background-color: #f8fafc;
            border-left: 4px solid #4f46e5;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 4px 4px 0;
        }
        
        /* Button */
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #4f46e5;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 15px 0;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 20px;
            background: #f1f5f9;
            color: #64748b;
            font-size: 14px;
        }
        
        .social-links {
            margin: 15px 0;
        }
        
        .social-links a {
            margin: 0 10px;
            text-decoration: none;
        }
        
        /* Responsive */
        @media screen and (max-width: 600px) {
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <!-- Replace with your logo URL -->
            <img src="https://yourwebsite.com/logo.png" alt="Company Logo" class="logo">
            <h1>Welcome to Our Community!</h1>
        </div>
        
        <div class="content">
            <p>Dear ${name},</p>
            
            <p>We're thrilled to welcome you to AGROFARM! Thank you for creating an account with us.</p>
            
            <div class="highlight-box">
                <strong>Your account details:</strong><br>
                Email: ${email}<br>
                Registered on: ${new Date().toLocaleDateString()}
            </div>
            
            <p>To get started, you can explore our platform or complete your profile setup:</p>
            
            <p style="text-align: center;">
                <a href="https://yourwebsite.com/dashboard" class="button">Go to Your Dashboard</a>
            </p>
            
            <p>If you have any questions or need assistance, our support team is here to help. Simply reply to this email or contact us at <a href="mailto:support@agrofarm.com">support@agrofarm.com</a>.</p>
            
            <p>We look forward to serving you!</p>
            
            <p>Best regards,<br>
            The AGROFARM</p>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="https://facebook.com/yourpage">Facebook</a>
                <a href="https://twitter.com/yourhandle">Twitter</a>
                <a href="https://linkedin.com/yourcompany">LinkedIn</a>
                <a href="https://instagram.com/yourprofile">Instagram</a>
            </div>
            
            <p>&copy; ${new Date().getFullYear()} [Your Company Name]. All rights reserved.</p>
            <p>
                <a href="https://yourwebsite.com/privacy">Privacy Policy</a> | 
                <a href="https://yourwebsite.com/terms">Terms of Service</a>
            </p>
            
            <p style="font-size: 12px; color: #94a3b8;">
                You're receiving this email because you signed up for an account at AGROFARM.
                <br>If this wasn't you, please <a href="https://yourwebsite.com/unsubscribe">let us know</a>.
            </p>
        </div>
    </div>
</body>
</html>
            `
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                //console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Successfully! A welcome email has been sent."
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
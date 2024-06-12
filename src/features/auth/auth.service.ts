import { CustomRequestHandler } from "../../types/common";
import { User } from "../user/user.entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret_key";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_PASS = process.env.EMAIL_PASS || "";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit OTP
};

const sendOtpEmail = (email: string, otp: string) => {
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Email Verification OTP',
        text: `Your OTP for email verification is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    const accessTokenExpiry = Math.floor(Date.now() / 1000) + parseInt(JWT_EXPIRES_IN.replace(/\D/g, ''));
    const refreshTokenExpiry = Math.floor(Date.now() / 1000) + parseInt(REFRESH_TOKEN_EXPIRES_IN.replace(/\D/g, ''));

    return { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry };
};

export const registerUser: CustomRequestHandler = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, type, birthDate, image, location } = req.body;
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            type,
            birthDate,
            image,
            location,
            status: 'Pending', // Initially, set status to 'Pending'
            otp,
            otpExpiry,
        });

        await newUser.save();

        sendOtpEmail(email, otp);

        res.status(201).json({ message: 'User registered successfully. Check your email for the OTP.' });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const verifyOTP: CustomRequestHandler = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (new Date() > user.otpExpiry!) {
            return res.status(400).json({ message: "OTP expired" });
        }

        user.status = "Active"; // Update status to 'Active'
        user.otp = undefined; // Clear the OTP
        user.otpExpiry = undefined; // Clear the OTP expiry

        await user.save();

        const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = generateTokens(user._id.toString());

        res.status(200).json({
            message: "Email verified successfully",
            accessToken,
            refreshToken,
            accessTokenExpiry,
            refreshTokenExpiry
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const loginUser: CustomRequestHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = generateTokens(user._id.toString());
        res.status(200).json({
            accessToken,
            refreshToken,
            accessTokenExpiry,
            refreshTokenExpiry
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const refreshToken: CustomRequestHandler = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        jwt.verify(token, REFRESH_TOKEN_SECRET, ((err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = generateTokens(decoded?.userId);
            res.status(200).json({
                accessToken,
                refreshToken,
                accessTokenExpiry,
                refreshTokenExpiry
            });
        }));
    } catch (error) {
        res.status(500).json(error);
    }
};

export const resendOTP: CustomRequestHandler = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

        await user.save();

        sendOtpEmail(email, otp);

        res.status(200).json({ message: "OTP resent successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};

/*

accessToken
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjY5OTNiYzRmNjQ4OWQ1Mjk4MzMyMzIiLCJpYXQiOjE3MTgxOTUxNjMsImV4cCI6MTcxODE5ODc2M30.bYgNhgwt_dbLfBg3O0URcjsPNNfra3d-9GKEbiktq5A

refreshToken
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjY5OTNiYzRmNjQ4OWQ1Mjk4MzMyMzIiLCJpYXQiOjE3MTgxOTUxNjMsImV4cCI6MTcxODc5OTk2M30.n6sM1fzQdWHm7JQ7GgbMW1CO9Pv3eNVydmzFlkjwGNU

*/
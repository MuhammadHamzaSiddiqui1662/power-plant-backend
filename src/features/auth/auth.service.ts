import { CustomRequestHandler } from "../../types/common";
import { User } from "../user/user.entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT || "10");

export const registerUser: CustomRequestHandler = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, type, birthDate, image, location, earning, listing, status } = req.body;
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);

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
            earning,
            listing,
            status
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
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
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json(error);
    }
};

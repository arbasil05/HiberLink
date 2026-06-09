import User from "../models/User.js";
import jwt from "jsonwebtoken";


export async function signup(req, res, next) {
    const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;
    try {
        const { username, password } = req.body;

        const user = await User.create({ username, password });

        const token = jwt.sign(
            { id: user._id },
            SECRET_JWT_KEY,
            { expiresIn: '7d' }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message: "success",
            user: user.username,
        });


    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {

    const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const validUser = await user.compare(password);

        if (!validUser) {
            const error = new Error("Password is incorrect");
            error.statusCode = 401
            throw error;
        }

        const token = jwt.sign(
            { id: user._id },
            SECRET_JWT_KEY,
            { expiresIn: '7d' }
        );

        console.log(token);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "success",
            user: user.username,
        });

    } catch (error) {
        next(error);
    }

}

export async function logout(req, res, next) {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ message: "Log out successful" });
    } catch (error) {
        next(error);
    }
}
import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signin = async (req, res, next) =>{
    const { email, password } = req.body;
    try {
        const validAdmin = await User.findOne({ email,isAdmin: true });
        if(!validAdmin) return next(errorHandler(404, 'Admin not found'));

        const validPassword = bcryptjs.compareSync(password, validAdmin.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong Credentials')); 

        const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validAdmin._doc;
        const expiryDate = new Date(Date.now() + 3600000);// one hour
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res) =>{
    try {
        const users = await User.find({ isAdmin: false });
        res.status(200).json(users);
        console.log(users);
    } catch (error) {
        next(error);
    }
}

export const signout = (req, res) =>{
    res.clearCookie('access_token').status(200).json('Signout success!');
}
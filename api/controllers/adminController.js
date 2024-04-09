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
    } catch (error) {
        next(error);
    }
}

export const signout = (req, res) =>{
    res.clearCookie('access_token').status(200).json('Signout success!');
}

export const getUserData = async (req, res) =>{
    const userId = req.params.id; // Extract the user ID from the request params
    try {
        const user = await User.findById(userId); // Query the database for the user with the provided ID
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json(user); // Return the user data if found
    } catch (error) {
        next(error); 
    }
}

export const updateUserData = async (req, res, next) => {
    const userId = req.params.id; // Extract the user ID from the request params
    const { username, email, password, profilePicture } = req.body; // Extract the updated user data from the request body
  
    try {
      // Query the database for the user with the provided ID
      const user = await User.findById(userId);
  
      if (!user) {
        // If user with the provided ID is not found, return a 404 error
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Update user data with the provided values
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password;
      if (profilePicture) user.profilePicture = profilePicture;
  
      // Save the updated user data to the database
      await user.save();
  
      // Return a success response
      return res.status(200).json({ success: true, message: 'User data updated successfully', user });
    } catch (error) {
      // If an error occurs, forward it to the error handler middleware
      next(error);
    }
  };
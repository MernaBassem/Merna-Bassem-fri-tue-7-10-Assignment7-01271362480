import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../DB/connection.js";
import { json } from "express";
import { ObjectId } from "mongodb";

// register user
//1-Signup
export const register = async (req, res, next) => {
  const { username, email, password, phone } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const isEmailExit = await User.findOne({ email });
    if (isEmailExit) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const user = await User.insertOne({
      username,
      email,
      password: passwordHash,
      phone,
    });

    return res.status(201).json({ message: "Successfully registered ", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//---------------------------------------------------------------
// login user
//2- Sign in

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  //check email
  const user = await User.findOne({ email });
  // check the email is found
  if (user == null) {
    return res.status(400).json({ message: "Email OR Password Not Correct" });
  } else {
    //check password
    const CheckPassword = await bcrypt.compare(password, user.password);
    if (!CheckPassword) {
      return res.status(400).json({ message: "Email OR Password Not Correct" });
    }
    // after check email
    // check Password is correct
    const token = jwt.sign({ userId: user.id }, "your_secret_key");
    return res.status(201).json({ token });
  }
};
//---------------------------------------------------------------------

//logout
export const logout = (req, res, next) => {
  return res.json({ message: "LogOut Successful" });
};

//---------------------------------------------------------------------
//3- Get a specific user.

export const specificUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//-----------------------------------------------------------------------

//4- Get all users.

export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find().toArray();
    res.status(200).json({ Users: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

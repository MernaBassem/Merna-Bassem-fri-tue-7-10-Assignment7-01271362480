import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../DB/connection.js";

// register user
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

    return res.status(201).json({ message: "Successfully registered " , user});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

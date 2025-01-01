import express from "express";
import bcrypt from "bcrypt";
import { validateSignupInput } from "../utils/validatator.js";
import User from "../models/usermodel.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // check if user alread exist

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send("You already have an account, please login");
    }

    // validatation of data
    validateSignupInput(req);

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const userinstance = new User(req.body);

    await userinstance.save();

    res.send("Your are successfully signedup");
  } catch (error) {
    res.status(400).send(error.message + "This is the one");
  }
});

authRouter.post("/login", async (req, res) => {
  
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("Invalid email");
    }
    const isMatch = await user.validatePassword(password);
    if (isMatch) {
      // create jwt token
      const token = await user.getJWT();

      // set cookie
      res.cookie("token", token);

      return res.status(200).send(user);
    } else {
      return res.status(400).json({ error: "Invalid password" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  
  
  try {
    res.clearCookie("token");
    return res.status(200).send("User is logged out");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default authRouter;

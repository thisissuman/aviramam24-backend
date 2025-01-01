import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateEditProfileData } from "../utils/validatator.js";

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// write for profile edit

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, age, gender } = req.body;

    if (!validateEditProfileData(req)) {
      return res.status(400).json({ error: "Invalid fields provided" });
    }
    const user = req.user;

    // Update only provided fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (age) user.age = age;
    if (gender) user.gender = gender.toLowerCase();

    await user.save();
    res.json({
      message: `${user.firstName}, your profile updated successfuly`,
      data: user,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

export default profileRouter;

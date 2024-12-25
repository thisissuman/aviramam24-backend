import express from "express";
import { userAuth } from "../middlewares/auth.js";

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default profileRouter;
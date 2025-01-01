import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const userAuth = async (req, res, next) => {
  try {
    // read token from cookies

    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized, token not provided" });
    }
    const decoded = await jwt.verify(token, "secretkey");

    const user = await User.findOne({ email: decoded.email });

    // validate token
    if (!user) {
      return res.status(401).send("Unauthorized, user not found");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

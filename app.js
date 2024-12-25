import express from "express";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

import authRouter from "./routes/authRoute.js";
import profileRouter from "./routes/profileRoute.js";

app.use("/", authRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("DB Connected successfully");
    app.listen(3000, () => {
      console.log("App is running on 3000 port");
    });
  })
  .catch(() => {
    console.error("Can not connect to db");
  });
